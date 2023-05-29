FROM node

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install
RUN npm run build

EXPOSE 3050

CMD ["npm", "start"]
