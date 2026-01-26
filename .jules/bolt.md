## 2024-05-22 - Caching Serialized JSON
**Learning:** `JSON.stringify` on simple object arrays (5000 items) is surprisingly fast (~10ms). Caching the string representation only yields ~15% improvement in request latency. The overhead of HTTP and logging dominates small request processing.
**Action:** Only cache JSON serialization for large datasets (>10k items) or complex object structures. Always verify impact with load testing.
