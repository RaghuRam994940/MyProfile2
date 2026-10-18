import os
import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Load environment variables from .env file if present
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ.setdefault(key.strip(), val.strip())

PORT = int(os.environ.get("PORT", 3000))
NEON_API_KEY = os.environ.get("NEON_API_KEY", "")
NEON_PROJECT_ID = os.environ.get("NEON_PROJECT_ID", "")
ADMIN_PASSCODE = os.environ.get("ADMIN_PASSCODE", "raghu2026")

_cached_connection_uri = None
_cached_sql_endpoint = None

def get_neon_connection():
    global _cached_connection_uri, _cached_sql_endpoint
    if _cached_connection_uri and _cached_sql_endpoint:
        return _cached_connection_uri, _cached_sql_endpoint
    
    url = f"https://console.neon.tech/api/v2/projects/{NEON_PROJECT_ID}/connection_uri?database_name=neondb&role_name=neondb_owner"
    req = urllib.request.Request(
        url,
        headers={"Authorization": f"Bearer {NEON_API_KEY}", "Accept": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())
        _cached_connection_uri = data.get("uri")
    
    parsed = urllib.parse.urlparse(_cached_connection_uri)
    host = parsed.hostname
    _cached_sql_endpoint = f"https://{host}/sql"
    return _cached_connection_uri, _cached_sql_endpoint

def execute_neon_query(sql_query):
    conn_uri, sql_endpoint = get_neon_connection()
    payload = json.dumps({"query": sql_query}).encode("utf-8")
    headers = {
        "Neon-Connection-String": conn_uri,
        "Content-Type": "application/json"
    }
    req = urllib.request.Request(sql_endpoint, data=payload, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=12) as resp:
        return json.loads(resp.read().decode("utf-8"))

def init_db():
    try:
        ddl = """
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(128) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        """
        execute_neon_query(ddl)
        print("Neon database table 'messages' verified and ready.")
    except Exception as e:
        print("Warning initializing Neon DB:", e)

class AppHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for standard web client communication
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Key")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/messages":
            query_params = urllib.parse.parse_qs(parsed.query)
            admin_key = query_params.get("key", [None])[0] or self.headers.get("X-Admin-Key")
            
            if admin_key != ADMIN_PASSCODE:
                self.send_json_response(401, {"error": "Unauthorized access to Admin comment feed"})
                return

            try:
                sql = "SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC;"
                res = execute_neon_query(sql)
                rows = res.get("rows", [])
                self.send_json_response(200, {"messages": rows})
            except Exception as e:
                self.send_json_response(500, {"error": str(e)})
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/messages":
            content_len = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_len)
            try:
                data = json.loads(body_bytes.decode("utf-8"))
            except Exception:
                self.send_json_response(400, {"error": "Invalid JSON body"})
                return

            name = str(data.get("name", "")).strip()
            email = str(data.get("email", "")).strip()
            message = str(data.get("message", "")).strip()

            if not name or not email or not message:
                self.send_json_response(400, {"error": "Name, email, and message are required fields"})
                return

            # Escape single quotes for SQL insertion
            safe_name = name.replace("'", "''")
            safe_email = email.replace("'", "''")
            safe_msg = message.replace("'", "''")

            try:
                sql = f"INSERT INTO messages (name, email, message) VALUES ('{safe_name}', '{safe_email}', '{safe_msg}') RETURNING id, created_at;"
                res = execute_neon_query(sql)
                inserted = res.get("rows", [{}])[0] if res.get("rows") else {}
                self.send_json_response(201, {
                    "success": True,
                    "id": inserted.get("id"),
                    "created_at": inserted.get("created_at"),
                    "message": "Transmission saved to Neon PostgreSQL"
                })
            except Exception as e:
                self.send_json_response(500, {"error": f"Failed to persist to Neon DB: {str(e)}"})
            return

        self.send_json_response(404, {"error": "Not Found"})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith("/api/messages/"):
            admin_key = self.headers.get("X-Admin-Key")
            query_params = urllib.parse.parse_qs(parsed.query)
            if not admin_key:
                admin_key = query_params.get("key", [None])[0]

            if admin_key != ADMIN_PASSCODE:
                self.send_json_response(401, {"error": "Unauthorized deletion"})
                return

            try:
                msg_id_str = parsed.path.replace("/api/messages/", "").split("/")[0]
                msg_id = int(msg_id_str)
                sql = f"DELETE FROM messages WHERE id = {msg_id};"
                res = execute_neon_query(sql)
                self.send_json_response(200, {"success": True, "deleted_id": msg_id, "rowCount": res.get("rowCount")})
            except ValueError:
                self.send_json_response(400, {"error": "Invalid message ID format"})
            except Exception as e:
                self.send_json_response(500, {"error": str(e)})
            return

        self.send_json_response(404, {"error": "Not Found"})

    def send_json_response(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    init_db()
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, AppHandler)
    print(f"Server serving portfolio and Neon DB API on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()
