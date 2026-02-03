## 2024-05-22 - [Benchmarking JSON Serialization]
**Learning:** Performance optimization of `JSON.stringify` caching is only measurable with sufficiently large datasets. With 1,000 items, the overhead of the test runner dominated the metrics (no visible improvement). With 10,000 items, the improvement was ~18% (69 vs 82 req/sec).
**Action:** When benchmarking serialization optimizations, ensure the payload size is large enough to make the serialization cost significant relative to IO/framework overhead.
