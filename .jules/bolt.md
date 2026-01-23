## 2025-02-23 - In-memory JSON Caching
**Learning:** `JSON.stringify` on large in-memory arrays is a significant CPU bottleneck for read operations.
**Action:** Cache the serialized JSON string and only update it on write operations (read-through/write-through caching).
