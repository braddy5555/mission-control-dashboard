FROM node:22

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install sqlite3

# Copy application files
COPY . .

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose port
EXPOSE 8081

# Start the server
CMD ["node", "server.js"]
