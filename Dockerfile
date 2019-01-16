FROM node:10-alpine as builder
WORKDIR /app
COPY . /app
RUN yarn && yarn build

FROM nginx:latest
COPY --from=builder /app/dist /var/www/html
COPY ./custom.conf /etc/nginx/conf.d/ 
RUN rm /etc/nginx/conf.d/default.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80

CMD ["nginx","-g","daemon off;"]
