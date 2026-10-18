# Token Optimization Guidelines (Tokless)

## Core Directives
1. **Prune Redundancy**: Avoid printing large data blobs, non-essential code blocks, or full directory tree dumps when concise summaries or targeted snippets suffice.
2. **Deterministic References**: Use exact line ranges and file links (`[file.ext](file:///path#L1-L20)`) instead of full file reproductions.
3. **Context Hygiene**: Keep conversational turns focused strictly on the active engineering objective.
