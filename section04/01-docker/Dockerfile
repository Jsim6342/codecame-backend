# # 1. 운영체제(우분투) 다운
# FROM ubuntu:22.04
# # 2. 우분투에 nodejs, npm 다운
# RUN sudo apt install nodejs
# # 3. yarn 다운
# RUN sudo npm install -g yarn


# ubuntu, nodejs, npm, yarn 이 모두 포함된 도커 이미지
FROM node:14

# 2. 내 컴퓨터 폴더, 파일 도커로 복사
COPY ./index.js /index.js

# 3. 도커 안에서 index.js 실행시키기
CMD node index.js