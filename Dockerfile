FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
# Install dependencies
RUN pnpm i 

# Rebuild the source code only when needed
WORKDIR /app



COPY . .

RUN pnpm run build

EXPOSE 8082
EXPOSE 3306

CMD ["npm", "start"]
