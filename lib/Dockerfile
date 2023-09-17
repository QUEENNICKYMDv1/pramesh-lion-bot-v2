FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/QUEENNICKYMDv1/pramesh-lion-bot-v2 /root/Queen nicky
WORKDIR /root/Queen nicky/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
