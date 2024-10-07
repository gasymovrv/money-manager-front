# build step
FROM node:14.16.0-alpine AS build
ARG REACT_APP_BACKEND_HOST
ARG GENERATE_SOURCEMAP
ARG NODE_ENV
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm install

ENV REACT_APP_BACKEND_HOST $REACT_APP_BACKEND_HOST
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
ENV NODE_ENV $NODE_ENV
RUN npm run build

# release step
FROM nginx:1.21.5-alpine AS release
COPY --from=build /app/build /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
