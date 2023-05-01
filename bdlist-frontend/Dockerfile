FROM nginx:alpine

# Copy static files into HTML directory
COPY dist /usr/share/nginx/html

# Nginx config for routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
