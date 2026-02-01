## 2026-02-01 - JSON Serialization Bottleneck
**Learning:** For in-memory data structures served via Express, `res.json()` performs `JSON.stringify()` on every request. With 10,000 items, this took ~17ms/req. Caching the serialized string reduced this to ~9ms/req (45% improvement).
**Action:** For read-heavy, write-infrequent endpoints returning large in-memory objects, cache the serialized string and serve it directly with `Content-Type: application/json`.
