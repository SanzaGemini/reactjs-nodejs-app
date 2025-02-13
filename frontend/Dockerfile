# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies before copying the entire project
RUN npm install

# Copy the entire frontend code
COPY . .

# Expose the React default port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
