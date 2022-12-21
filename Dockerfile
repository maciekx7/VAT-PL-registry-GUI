FROM node:18.11.0-alpine as builder

WORKDIR /app
COPY . .
RUN npm install

RUN npm run build


FROM nginx:1.22.1-alpine

# Clean nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy dist
COPY --from=builder /app/dist/cpu-vat /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Permission
RUN chown root /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/*

# Expose port
EXPOSE 4200

# Start
CMD ["nginx", "-g", "daemon off;"]
