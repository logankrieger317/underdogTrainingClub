# Use Node.js 22
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy schema.sql to dist folder for database initialization
RUN mkdir -p server/dist/db && cp server/db/schema.sql server/dist/db/

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server/dist/index.js"]
