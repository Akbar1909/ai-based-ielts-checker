git checkout main

npm install

npm run build

pm2 start dist/main.js --name ai-based-api
