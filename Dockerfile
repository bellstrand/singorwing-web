FROM nginx

COPY images /usr/share/nginx/html/images
COPY node_modules/font-awesome/fonts /usr/share/nginx/html/node_modules/font-awesome/fonts
COPY scripts /usr/share/nginx/html/scripts
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/nginx.conf
COPY package.json /usr/share/nginx/html/package.json
