# Use a node image to build the Angular app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the Angular project to the working directory
COPY . .

# Build the Angular app using production configuration
RUN npm run build --configuration production

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Copy the built Angular files to the nginx html folder
COPY --from=build /app/dist/your-angular-app-name /usr/share/nginx/html

# Expose the port nginx will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
