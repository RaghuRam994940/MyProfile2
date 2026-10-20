// Dynamic Script & Utilities for Karumanchi Raghu Ram's Portfolio

// Code Snippets for Interactive Terminal
const snippets = {
  cpp: `// C++ Algorithmic Solution Demo
#include <iostream>
#include <vector>

class Solution {
public:
    void evaluateCandidate() {
        std::cout << "Name: Karumanchi Raghu Ram\\n";
        std::cout << "Role: Computer Science Engineer\\n";
        std::cout << "Focus: Clean Logic, Rigorous Systems & Frontend\\n";
    }
};

int main() {
    Solution dev;
    dev.evaluateCandidate();
    return 0;
}`,
  c: `/* C Systems Programming Demo */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[64];
    float cgpa;
    char institution[32];
} Engineer;

int main() {
    Engineer student = {"Karumanchi Raghu Ram", 8.2f, "NBKRIST"};
    printf("Candidate: %s\\nScore: %.1f CGPA\\nCollege: %s\\n", 
           student.name, student.cgpa, student.institution);
    return 0;
}`,
  js: `// Modern Frontend Architecture (Vanilla ES6+)
const candidate = {
  name: "Karumanchi Raghu Ram",
  skills: ["C", "C++", "HTML5", "CSS3", "JavaScript"],
  certified: ["Oracle DB CSE Workshop", "NPTEL Courses", "RITx Critical Thinking"],
  readyForRole: true
};

console.log(\`Ready to build high-performance systems: \${candidate.readyForRole}\`);`
};

function switchSnippet(lang) {
  const codeDisplay = document.getElementById("terminal-code-display");
  const tabs = document.querySelectorAll(".t-tab");
  
  if (snippets[lang] && codeDisplay) {
    codeDisplay.textContent = snippets[lang];
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.textContent.toLowerCase().includes(lang));
    });
  }
}

// Copy to Clipboard Utility with Toast
function copyText(text, btnId) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
    const btn = document.getElementById(btnId);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="btn-icon">✓</span> Copied!`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  }).catch(err => {
    showToast(`Unable to copy text: ${err}`);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Contact Form Handler connected to live Neon PostgreSQL
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const sendBtn = document.getElementById("send-msg-btn");

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (!name || !email || !message) {
    feedback.className = "form-feedback error";
    feedback.textContent = "Please fill in all fields (Name, Email, Message).";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Transmitting to Neon DB...";
  feedback.className = "form-feedback";
  feedback.textContent = "";

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      feedback.className = "form-feedback success";
      feedback.textContent = `Transmission verified! Thank you, ${name}. Your message is stored in Neon Cloud DB.`;
      form.reset();
      showToast("Message recorded in Neon Cloud DB!");
    } else {
      throw new Error(data.error || "Server could not process message");
    }
  } catch (err) {
    feedback.className = "form-feedback error";
    feedback.textContent = `Transmission notice: ${err.message}. Please check connection.`;
    showToast(`Transmission error: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Transmit Message";
  }
}

// -------------------------------------------------------------
// Playable Mini-Chess Engine with Symmetrical Graphics & Tactical Bot
// -------------------------------------------------------------

// Crisp High-Craft Vector SVG Chess Pieces (True Gold/Amber for White, Obsidian/Charcoal for Black)
const CHESS_SVGS = {
  // White pieces (Amber-Gold Glow)
  'wP': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 9c-2.2 0-4 1.8-4 4 0 1.2.5 2.3 1.4 3-1.6.8-3 2.5-3 4.5 0 1.3.6 2.5 1.5 3.3-1.5 1-2.4 2.8-2.4 4.7 0 2.8 2 5.2 4.7 5.8L20 37h5l-.7-2.7c2.7-.6 4.7-3 4.7-5.8 0-1.9-.9-3.7-2.4-4.7.9-.8 1.5-2 1.5-3.3 0-2-1.4-3.7-3-4.5.9-.7 1.4-1.8 1.4-3 0-2.2-1.8-4-4-4z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'wR': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M9 39h27v-3H9v3zm3-4.5h21l-1.5-6H13.5l-1.5 6zM14 14.5v11h17v-11H14zM11 9v4h3v-2.5h5V13h7v-2.5h5V13h3V9H11z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5"/></svg>`,
  'wN': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22 10c-5.5 0-8 3.5-9 7.5-.7 3 .5 6.5 2 8.5-1.5 1.5-3.5 4-3.5 7h23c0-3.5-1.5-6-3-7.5 1-2 2-5 1.5-8-1-5.5-5.5-7.5-11-7.5zm-3 7.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5"/></svg>`,
  'wB': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 8c-3 0-5 3.5-5 7 0 2.5 1.2 4.5 2.5 5.5-2 1.5-3 4-3 6.5 0 3 2 5.5 5.5 6 3.5-.5 5.5-3 5.5-6 0-2.5-1-5-3-6.5 1.3-1 2.5-3 2.5-5.5 0-3.5-2-7-5-7zm-4 28h8v3h-8v-3z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5"/></svg>`,
  'wQ': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M9 26l3.5-12.5 6 8.5 4-11 4 11 6-8.5L36 26H9zm2 3h23v4H11v-4zm-2 6h27v3H9v-3z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5"/></svg>`,
  'wK': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 8v4m-2-2h4M11.5 37h22v-3h-22v3zm2-5h18l-1.5-6h-15l-1.5 6zm2-8h14c2-4 3-8 1-11-2-3-6-3-8 0-2-3-6-3-8 0-2 3-1 7 1 11z" fill="#f8eed9" stroke="#d4af37" stroke-width="1.5"/></svg>`,

  // Black pieces (Obsidian-Charcoal with Slate Border)
  'bP': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 9c-2.2 0-4 1.8-4 4 0 1.2.5 2.3 1.4 3-1.6.8-3 2.5-3 4.5 0 1.3.6 2.5 1.5 3.3-1.5 1-2.4 2.8-2.4 4.7 0 2.8 2 5.2 4.7 5.8L20 37h5l-.7-2.7c2.7-.6 4.7-3 4.7-5.8 0-1.9-.9-3.7-2.4-4.7.9-.8 1.5-2 1.5-3.3 0-2-1.4-3.7-3-4.5.9-.7 1.4-1.8 1.4-3 0-2.2-1.8-4-4-4z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'bR': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M9 39h27v-3H9v3zm3-4.5h21l-1.5-6H13.5l-1.5 6zM14 14.5v11h17v-11H14zM11 9v4h3v-2.5h5V13h7v-2.5h5V13h3V9H11z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5"/></svg>`,
  'bN': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22 10c-5.5 0-8 3.5-9 7.5-.7 3 .5 6.5 2 8.5-1.5 1.5-3.5 4-3.5 7h23c0-3.5-1.5-6-3-7.5 1-2 2-5 1.5-8-1-5.5-5.5-7.5-11-7.5zm-3 7.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5"/></svg>`,
  'bB': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 8c-3 0-5 3.5-5 7 0 2.5 1.2 4.5 2.5 5.5-2 1.5-3 4-3 6.5 0 3 2 5.5 5.5 6 3.5-.5 5.5-3 5.5-6 0-2.5-1-5-3-6.5 1.3-1 2.5-3 2.5-5.5 0-3.5-2-7-5-7zm-4 28h8v3h-8v-3z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5"/></svg>`,
  'bQ': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M9 26l3.5-12.5 6 8.5 4-11 4 11 6-8.5L36 26H9zm2 3h23v4H11v-4zm-2 6h27v3H9v-3z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5"/></svg>`,
  'bK': `<svg viewBox="0 0 45 45" class="chess-piece-svg"><path d="M22.5 8v4m-2-2h4M11.5 37h22v-3h-22v3zm2-5h18l-1.5-6h-15l-1.5 6zm2-8h14c2-4 3-8 1-11-2-3-6-3-8 0-2-3-6-3-8 0-2 3-1 7 1 11z" fill="#1b1d24" stroke="#8b949e" stroke-width="1.5"/></svg>`
};

// Symmetrical Standard Chess Starting Setup
const INITIAL_CHESS_BOARD = {
  // Rank 8 - Black Pieces
  'a8': 'bR', 'b8': 'bN', 'c8': 'bB', 'd8': 'bQ', 'e8': 'bK', 'f8': 'bB', 'g8': 'bN', 'h8': 'bR',
  // Rank 7 - Black Pawns
  'a7': 'bP', 'b7': 'bP', 'c7': 'bP', 'd7': 'bP', 'e7': 'bP', 'f7': 'bP', 'g7': 'bP', 'h7': 'bP',
  // Rank 2 - White Pawns
  'a2': 'wP', 'b2': 'wP', 'c2': 'wP', 'd2': 'wP', 'e2': 'wP', 'f2': 'wP', 'g2': 'wP', 'h2': 'wP',
  // Rank 1 - White Pieces
  'a1': 'wR', 'b1': 'wN', 'c1': 'wB', 'd1': 'wQ', 'e1': 'wK', 'f1': 'wB', 'g1': 'wN', 'h1': 'wR'
};

let gameState = {
  board: { ...INITIAL_CHESS_BOARD },
  turn: 'w', // 'w' = White (User), 'b' = Black (Bot)
  selectedSquare: null,
  validMoves: [],
  history: [],
  isThinking: false
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

function coordToXY(coord) {
  const file = FILES.indexOf(coord[0]);
  const rank = parseInt(coord[1], 10);
  return { x: file, y: 8 - rank }; // 0-7, 0 is rank 8, 7 is rank 1
}

function xyToCoord(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) return null;
  return `${FILES[x]}${8 - y}`;
}

function renderChessBoard() {
  const boardEl = document.getElementById("chess-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";

  RANKS.forEach((rank, rIdx) => {
    FILES.forEach((file, fIdx) => {
      const coord = `${file}${rank}`;
      const square = document.createElement("div");
      // Symmetrical board rule: a1 (fIdx 0, rank 1 -> rIdx 7) is dark; h1 is light
      const isLight = (rIdx + fIdx) % 2 === 0;

      square.className = `chess-square ${isLight ? 'light' : 'dark'}`;
      square.dataset.coord = coord;

      // Add edge coordinate labels for chess symmetry
      if (fIdx === 0) {
        const rankLabel = document.createElement("span");
        rankLabel.className = "coord-label rank-label";
        rankLabel.textContent = rank;
        square.appendChild(rankLabel);
      }
      if (rIdx === 7) {
        const fileLabel = document.createElement("span");
        fileLabel.className = "coord-label file-label";
        fileLabel.textContent = file;
        square.appendChild(fileLabel);
      }

      // Render Piece SVG if present
      const piece = gameState.board[coord];
      if (piece) {
        const pieceWrap = document.createElement("div");
        pieceWrap.className = `chess-piece ${piece.startsWith('w') ? 'piece-white' : 'piece-black'}`;
        pieceWrap.innerHTML = CHESS_SVGS[piece] || '';
        square.appendChild(pieceWrap);
      }

      // Highlight selected square
      if (gameState.selectedSquare === coord) {
        square.classList.add("selected");
      }

      // Highlight legal target moves
      if (gameState.validMoves.includes(coord)) {
        if (gameState.board[coord]) {
          square.classList.add("legal-capture");
        } else {
          square.classList.add("legal-move");
        }
      }

      square.addEventListener("click", () => handleSquareInteraction(coord));
      boardEl.appendChild(square);
    });
  });

  updateChessStatusHUD();
}

function handleSquareInteraction(coord) {
  if (gameState.isThinking) return;

  const piece = gameState.board[coord];

  // Case 1: Square contains player's piece -> Select it and compute legal moves
  if (piece && piece[0] === gameState.turn) {
    gameState.selectedSquare = coord;
    gameState.validMoves = calculateLegalMoves(coord, gameState.board);
    renderChessBoard();
    return;
  }

  // Case 2: Player previously selected a piece and clicks a valid destination
  if (gameState.selectedSquare && gameState.validMoves.includes(coord)) {
    executeMove(gameState.selectedSquare, coord);
    return;
  }

  // Case 3: Clicked empty or invalid square -> Deselect
  if (gameState.selectedSquare) {
    gameState.selectedSquare = null;
    gameState.validMoves = [];
    renderChessBoard();
  }
}

function calculateLegalMoves(fromCoord, board) {
  const piece = board[fromCoord];
  if (!piece) return [];

  const color = piece[0]; // 'w' or 'b'
  const type = piece[1];  // 'P', 'R', 'N', 'B', 'Q', 'K'
  const { x, y } = coordToXY(fromCoord);
  const moves = [];

  function addIfValid(targetX, targetY) {
    const targetCoord = xyToCoord(targetX, targetY);
    if (!targetCoord) return false;
    const destPiece = board[targetCoord];
    if (!destPiece) {
      moves.push(targetCoord);
      return true; // continue sliding
    }
    if (destPiece[0] !== color) {
      moves.push(targetCoord);
    }
    return false; // hit piece, stop ray
  }

  // 1. Pawn Moves
  if (type === 'P') {
    const dir = color === 'w' ? -1 : 1; // white moves up (-y), black down (+y)
    const startY = color === 'w' ? 6 : 1;

    // Single step forward
    const forwardOne = xyToCoord(x, y + dir);
    if (forwardOne && !board[forwardOne]) {
      moves.push(forwardOne);
      // Double step from starting rank
      const forwardTwo = xyToCoord(x, y + 2 * dir);
      if (y === startY && forwardTwo && !board[forwardTwo]) {
        moves.push(forwardTwo);
      }
    }

    // Diagonal captures
    [-1, 1].forEach(dx => {
      const diagCoord = xyToCoord(x + dx, y + dir);
      if (diagCoord && board[diagCoord] && board[diagCoord][0] !== color) {
        moves.push(diagCoord);
      }
    });
  }

  // 2. Knight Moves (L-shape)
  if (type === 'N') {
    const knightDeltas = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    knightDeltas.forEach(([dx, dy]) => {
      const tc = xyToCoord(x + dx, y + dy);
      if (tc && (!board[tc] || board[tc][0] !== color)) {
        moves.push(tc);
      }
    });
  }

  // 3. Bishop & Queen Diagonal Rays
  if (type === 'B' || type === 'Q') {
    const dirs = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    dirs.forEach(([dx, dy]) => {
      let curX = x + dx;
      let curY = y + dy;
      while (curX >= 0 && curX <= 7 && curY >= 0 && curY <= 7) {
        if (!addIfValid(curX, curY)) break;
        curX += dx;
        curY += dy;
      }
    });
  }

  // 4. Rook & Queen Straight Rays
  if (type === 'R' || type === 'Q') {
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    dirs.forEach(([dx, dy]) => {
      let curX = x + dx;
      let curY = y + dy;
      while (curX >= 0 && curX <= 7 && curY >= 0 && curY <= 7) {
        if (!addIfValid(curX, curY)) break;
        curX += dx;
        curY += dy;
      }
    });
  }

  // 5. King Moves (Single step all 8 directions)
  if (type === 'K') {
    const kingDeltas = [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],          [1,  0],
      [-1,  1], [0,  1], [1,  1]
    ];
    kingDeltas.forEach(([dx, dy]) => {
      const tc = xyToCoord(x + dx, y + dy);
      if (tc && (!board[tc] || board[tc][0] !== color)) {
        moves.push(tc);
      }
    });
  }

  return moves;
}

function executeMove(fromCoord, toCoord) {
  const movingPiece = gameState.board[fromCoord];
  const capturedPiece = gameState.board[toCoord];

  // Perform move on board
  delete gameState.board[fromCoord];

  // Pawn promotion to Queen
  if (movingPiece === 'wP' && toCoord.endsWith('8')) {
    gameState.board[toCoord] = 'wQ';
  } else if (movingPiece === 'bP' && toCoord.endsWith('1')) {
    gameState.board[toCoord] = 'bQ';
  } else {
    gameState.board[toCoord] = movingPiece;
  }

  gameState.history.push({ from: fromCoord, to: toCoord, piece: movingPiece, captured: capturedPiece });
  gameState.selectedSquare = null;
  gameState.validMoves = [];

  // Audio/Visual Feedback
  if (capturedPiece) {
    showToast(`Captured ${getPieceName(capturedPiece)} at ${toCoord.toUpperCase()}!`);
  }

  // Switch turn
  gameState.turn = gameState.turn === 'w' ? 'b' : 'w';
  renderChessBoard();

  // If Black's turn, trigger Bot response after a human-like contemplation delay
  if (gameState.turn === 'b') {
    gameState.isThinking = true;
    updateChessStatusHUD("Bot is calculating counter-tactics...");

    setTimeout(() => {
      makeBotMove();
      gameState.isThinking = false;
      renderChessBoard();
    }, 600);
  }
}

function makeBotMove() {
  const allBlackMoves = [];

  // Gather all legal moves for all black pieces
  Object.keys(gameState.board).forEach(coord => {
    if (gameState.board[coord] && gameState.board[coord].startsWith('b')) {
      const legalMoves = calculateLegalMoves(coord, gameState.board);
      legalMoves.forEach(target => {
        allBlackMoves.push({
          from: coord,
          to: target,
          captured: gameState.board[target]
        });
      });
    }
  });

  if (allBlackMoves.length === 0) {
    showToast("Checkmate or Stalemate! White wins.");
    updateChessStatusHUD("Checkmate! Game complete. White wins!");
    return;
  }

  // Tactical Bot Decision Matrix:
  // 1. Highest priority: Captures with piece valuation (Q > R > B/N > P)
  // 2. Center control (e4, d4, e5, d5, f6, c6)
  // 3. Fallback: deliberate tactical opening move
  const pieceValues = { 'wQ': 9, 'wR': 5, 'wB': 3, 'wN': 3, 'wP': 1, 'wK': 100 };
  const centerSquares = ['e4', 'd4', 'e5', 'd5', 'f6', 'c6', 'f3', 'c3'];

  allBlackMoves.forEach(m => {
    let score = 0;
    if (m.captured) {
      score += (pieceValues[m.captured] || 1) * 10;
    }
    if (centerSquares.includes(m.to)) {
      score += 2;
    }
    m.score = score;
  });

  // Sort by highest strategic score, break ties randomly
  allBlackMoves.sort((a, b) => b.score - a.score || (Math.random() - 0.5));
  const chosenMove = allBlackMoves[0];

  executeMove(chosenMove.from, chosenMove.to);
}

function getPieceName(code) {
  const names = {
    'P': 'Pawn', 'R': 'Rook', 'N': 'Knight', 'B': 'Bishop', 'Q': 'Queen', 'K': 'King'
  };
  return names[code[1]] || 'Piece';
}

function updateChessStatusHUD(customText) {
  const statusEl = document.getElementById("chess-status");
  const turnBadge = document.getElementById("chess-turn-badge");

  if (turnBadge) {
    if (gameState.turn === 'w') {
      turnBadge.textContent = "White to move (You)";
      turnBadge.className = "badge badge-accent";
    } else {
      turnBadge.textContent = "Black to move (Bot)";
      turnBadge.className = "badge";
      turnBadge.style.color = "var(--accent-amber)";
    }
  }

  if (statusEl) {
    if (customText) {
      statusEl.textContent = customText;
    } else if (gameState.turn === 'w') {
      statusEl.textContent = "Your turn. Select any White piece to preview legal moves.";
    } else {
      statusEl.textContent = "Bot responded. Analyze board position and execute your move.";
    }
  }
}

function resetBoard() {
  gameState = {
    board: { ...INITIAL_CHESS_BOARD },
    turn: 'w',
    selectedSquare: null,
    validMoves: [],
    history: [],
    isThinking: false
  };
  renderChessBoard();
  showToast("Board reset to symmetrical starting position. White to move!");
}

// Header elevation on scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if (header) {
    if (window.scrollY > 40) {
      header.style.borderColor = "var(--border-accent)";
      header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.6)";
    } else {
      header.style.borderColor = "var(--border-subtle)";
      header.style.boxShadow = "none";
    }
  }
});

/* -------------------------------------------------------------
   300-Frame Zero-G Chess Scroll Scrubber Canvas Engine
------------------------------------------------------------- */
const TOTAL_FRAMES = 300;
const frames = new Array(TOTAL_FRAMES);
let currentFrameIndex = 0;
let isFirstFrameLoaded = false;
let canvas, ctx;
let isTicking = false;

function getFramePath(index) {
  // Pad index 1-300 with 3 digits: 001, 002, ..., 300
  const padded = String(index).padStart(3, "0");
  return `gif/ezgif-frame-${padded}.jpg`;
}

function initChessHeroSequence() {
  canvas = document.getElementById("chess-intro-canvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d", { alpha: false });

  // Size canvas to device pixel ratio
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 1. Immediately load and paint Frame 1
  const firstFrameImg = new Image();
  firstFrameImg.src = getFramePath(1);
  firstFrameImg.onload = () => {
    frames[0] = firstFrameImg;
    isFirstFrameLoaded = true;
    renderFrame(0);
  };

  // 2. Progressive background preload for all 300 frames
  preloadRemainingFrames();

  // 3. Scroll-scrub listener using requestAnimationFrame
  window.addEventListener("scroll", onScrollUpdate, { passive: true });
  // Initial position check
  onScrollUpdate();
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  if (isFirstFrameLoaded) {
    renderFrame(currentFrameIndex);
  }
}

function preloadRemainingFrames() {
  let loadedCount = 1; // frame 1 is already started
  const badgeText = document.getElementById("hero-loader-text");

  // Load in progressive batches for network efficiency
  for (let i = 2; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    const frameIdx = i - 1;
    img.onload = () => {
      frames[frameIdx] = img;
      loadedCount++;
      if (badgeText) {
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        if (percent < 100) {
          badgeText.textContent = `Loading Zero-G Strategy: ${percent}%`;
        } else {
          badgeText.textContent = `Zero-G Strategy Loaded (300/300)`;
        }
      }
    };
    img.onerror = () => {
      // In case of any frame read error, fallback to previous
      loadedCount++;
    };
  }
}

function renderFrame(index) {
  if (!canvas || !ctx) return;

  // Find target frame or fallback to nearest loaded frame
  let img = frames[index];
  if (!img) {
    // Search backward for nearest available frame
    for (let i = index - 1; i >= 0; i--) {
      if (frames[i]) {
        img = frames[i];
        break;
      }
    }
  }
  if (!img) {
    // Search forward if backward had none
    for (let i = index + 1; i < TOTAL_FRAMES; i++) {
      if (frames[i]) {
        img = frames[i];
        break;
      }
    }
  }

  if (!img) return;

  // Object-fit 'cover' rendering with high-DPI scaling
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const imgWidth = img.naturalWidth || 1280;
  const imgHeight = img.naturalHeight || 720;

  const scale = Math.max(cWidth / imgWidth, cHeight / imgHeight);
  const renderWidth = imgWidth * scale;
  const renderHeight = imgHeight * scale;
  const offsetX = (cWidth - renderWidth) / 2;
  const offsetY = (cHeight - renderHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
}

function onScrollUpdate() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScrollScrub();
      isTicking = false;
    });
    isTicking = true;
  }
}

function handleScrollScrub() {
  const container = document.getElementById("hero-scroll");
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const totalDistance = container.offsetHeight - window.innerHeight;
  if (totalDistance <= 0) return;

  // Progress 0.0 at top of hero-scroll, 1.0 when scrolled past
  const scrolled = -rect.top;
  const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

  // Compute frame index 0 to 299
  const targetFrame = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
  if (targetFrame !== currentFrameIndex) {
    currentFrameIndex = targetFrame;
    renderFrame(currentFrameIndex);
  }

  // Choreograph HUD narrative phases based on scroll progress
  const p1 = document.getElementById("hero-phase-1");
  const p2 = document.getElementById("hero-phase-2");
  const p3 = document.getElementById("hero-phase-3");
  const cue = document.getElementById("hero-scroll-cue");

  if (p1 && p2 && p3) {
    if (progress < 0.28) {
      p1.classList.add("active");
      p2.classList.remove("active");
      p3.classList.remove("active");
    } else if (progress >= 0.28 && progress < 0.68) {
      p1.classList.remove("active");
      p2.classList.add("active");
      p3.classList.remove("active");
    } else {
      p1.classList.remove("active");
      p2.classList.remove("active");
      p3.classList.add("active");
    }
  }

  if (cue) {
    // Fade out bottom cue once scrolling begins
    cue.style.opacity = progress > 0.04 ? "0" : "0.9";
  }
}

/* -------------------------------------------------------------
   GitHub-Style Alternating Side Reveal IntersectionObserver
------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-block");
  if (!revealElements.length) return;

  // Check if browser supports IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        // Keep it revealed permanently like GitHub's smooth narrative flow
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
   Mobile Drawer Controller
------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const closeBtn = document.getElementById("drawer-close-btn");
  const drawerLinks = document.querySelectorAll(".drawer-link, #drawer-cta-btn");

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    toggleBtn.classList.add("is-active");
    toggleBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggleBtn.classList.remove("is-active");
    toggleBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  backdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderChessBoard();
  initChessHeroSequence();
  initScrollReveals();
  initMobileDrawer();
});


