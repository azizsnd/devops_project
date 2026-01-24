## 2025-02-23 - [JSON Serialization Caching]
**Learning:** `JSON.stringify` on large in-memory arrays blocks the main thread. Caching the serialized string moves complexity from O(N) on reads to O(1).
**Action:** Apply this pattern for read-heavy, write-infrequent in-memory data structures.
