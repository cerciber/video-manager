# Use a base Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm i

# Copy all project files to the working directory
COPY . .

# Expose the port where the application will run
EXPOSE 3001

# Command to run the application
RUN npm run prisma:generate
RUN npm run prisma:reset
CMD ["node", "src/index.js"]