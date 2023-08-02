FROM node:18.16.0-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript


COPY . .

ENV PORT=4000

ENV SECRET_KEY=PRASHANT

EXPOSE 4000

CMD ["npm","start"]