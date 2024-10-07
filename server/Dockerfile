# 1. Node.js 이미지 사용
FROM node:18-alpine

# 2. 작업 디렉토리 생성
WORKDIR /usr/src/app

# 3. package.json과 yarn.lock 복사
COPY package.json ./
COPY yarn.lock ./

# 4. 의존성 설치
RUN yarn install

# 5. 나머지 모든 파일 복사
COPY . .

# 6. 빌드 (Nest.js는 TypeScript로 작성되므로 빌드가 필요)
RUN yarn build

# 7. 서버 실행
CMD ["yarn", "prod"]

# 8. 기본 포트 설정
EXPOSE 8080