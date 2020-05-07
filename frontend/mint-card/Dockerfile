FROM node:latest as build_stage
#13.12.0-alpine3.10
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
RUN npm run build

# FROM nginx:latest
# 1.17.9-alpine

#copy dist content to html nginx folder, config nginx to point in index.html
# COPY --from=build_stage /usr/src/app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# docker build -t <image_name>:<tag (optional)> <directory_with_dockerfile>  
# docker run --name <container_name> -p 4200:4200 <image_name>
