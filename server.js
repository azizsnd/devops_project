const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');

const app = express();
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'student-registry' },
  transports: [
    new winston.transports.Console()
  ],
});

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const students = [];
let studentsCache = null;
let studentIdCounter = 1;


app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.get('/students', (req, res) => {
  logger.info('Fetching students');
  if (studentsCache) {
    return res.set('Content-Type', 'application/json').send(studentsCache);
  }
  studentsCache = JSON.stringify(students);
  res.set('Content-Type', 'application/json').send(studentsCache);
});


app.post('/students', (req, res) => {
  const student = req.body;

  if (!student.name || !student.email) {
    logger.warn('Validation failed: Missing name or email');
    return res.status(400).json({ error: 'Name and email are required' });
  }

  student.id = studentIdCounter++;
  students.push(student);
  studentsCache = null;

  logger.info(`Student created: ${JSON.stringify(student)}`);
  res.status(201).json(student);
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

module.exports = app;
