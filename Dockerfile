FROM node:18.12.1-alpine

COPY package*.json ./
RUN npm ci --omit=dev

COPY ./dist ./dist

EXPOSE 8080
CMD ["npm", "run", "start:prod"]