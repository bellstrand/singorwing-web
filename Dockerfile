FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY export /usr/share/nginx/html
