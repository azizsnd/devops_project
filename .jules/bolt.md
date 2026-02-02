## 2024-05-22 - JSON Cache Optimization
**Learning:** Benchmarking performance improvements in this environment requires large datasets (e.g., 10,000 items) as `supertest` overhead dominates measurements for smaller payloads.
**Action:** Use large datasets for benchmarks.

## 2024-05-22 - Express Response Caching
**Learning:** When returning cached serialized JSON in Express, use `res.send()` with the `Content-Type: application/json` header to avoid double serialization.
**Action:** `res.set('Content-Type', 'application/json').send(cachedString)`
