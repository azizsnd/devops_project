# Use specific version for reproducibility
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Security: Run as non-root user 
USER node

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "server.js"]
