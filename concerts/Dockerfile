FROM node

WORKDIR /app/concerts

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]