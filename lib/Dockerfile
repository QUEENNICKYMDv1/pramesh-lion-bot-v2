FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/QUEENNICKY/QUEEN-NICKY-MD-V1 /root/QUEEN-NICKY
WORKDIR /root/QUEEN-NICKY/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
