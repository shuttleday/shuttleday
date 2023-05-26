#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in files served by NGINX
for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html;
do
  sed -i 's|VITE_CLIENT_ID_PLACEHOLDER|'${VITE_CLIENT_ID}'|g' $file
  sed -i 's|VITE_API_LINK_PLACEHOLDER|'${VITE_API_LINK}'|g' $file
  # Your other variables here...
done

# Starting NGINX
nginx -g 'daemon off;'
