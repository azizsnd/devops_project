## 2025-02-19 - Cache Serialized JSON for Read-Heavy In-Memory Data
**Learning:** For read-heavy, write-infrequent endpoints serving in-memory data, `JSON.stringify` on every request can be a bottleneck.
**Action:** Cache the serialized JSON string and update it only on writes. Serve the string directly with `res.send()` and correct Content-Type header.
