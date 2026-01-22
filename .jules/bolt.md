## 2026-01-22 - JSON Serialization Bottleneck in In-Memory Store
**Learning:** Serving large in-memory arrays via Express `res.json` incurs significant CPU overhead due to repeated serialization.
**Action:** Cache the serialized JSON string when the data is read-heavy and write-infrequent.
