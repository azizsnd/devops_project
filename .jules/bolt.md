## 2026-01-28 - Cache serialized JSON for read-heavy endpoints
**Learning:** `res.json()` performs `JSON.stringify()` every time. For read-heavy, write-infrequent in-memory data, caching the serialized string significantly reduces CPU overhead.
**Action:** When serving large in-memory arrays that change infrequently, cache the stringified JSON and serve it with `res.send()` and `Content-Type: application/json`. Invalidate on updates.
