const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');

const app = express();
app.use(express.json());

// --- Observability (Logging) ---
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'student-registry' },
  transports: [
    new winston.transports.Console()
  ],
});

// --- Observability (Metrics) ---
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// --- In-Memory DB ---
const students = [];

// --- Endpoints ---

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.get('/students', (req, res) => {
  logger.info('Fetching students');
  res.json(students);
});

app.post('/students', (req, res) => {
  const student = req.body;

  // Validation
  if (!student.name || !student.email) {
    logger.warn('Validation failed: Missing name or email');
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Adding ID
  student.id = students.length + 1;
  students.push(student);

  logger.info(`Student created: ${JSON.stringify(student)}`);
  res.status(201).json(student);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
