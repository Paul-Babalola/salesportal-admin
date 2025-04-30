# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
#RUN rm .env
#COPY dev .env
# Build the Vue.js application
RUN npm run build

# Use a smaller and more secure base image for the production build
FROM nginx:alpine

# Copy the built Vue.js application from the build-stage container
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d/default.conf && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx
# Expose port 80 for the Nginx server
EXPOSE 80 8080

# Start Nginx to serve the Vue.js application
CMD ["nginx", "-g", "daemon off;"]

