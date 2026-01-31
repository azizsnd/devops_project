## 2024-05-22 - Caching Serialized JSON for In-Memory Data
**Learning:** `JSON.stringify` on a large in-memory array (10k items) adds measurable overhead (~6ms/req).
**Action:** For read-heavy, write-infrequent in-memory data, cache the serialized string and invalidate on writes to avoid repeated serialization costs.
