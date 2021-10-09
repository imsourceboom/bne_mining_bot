# bne_mining_bot

linux 서버에 mysql 설치

의존성 라이브러리 설치

```
cd ${path}/bne_mining && npm i;
```

앱 실행전에 sequelize-cli을 global로 설치 후
${path}/bne_mining 앱 디렉토리에서 schema 생성

```
npm i sequelize-cli -g && sequelize db:create;
```

앱 최종 서비스 전에 pm2을 global로 설치

```
npm i pm2 -g;
```

### - config

1. .env 파일 설정
2. ton-env.sh 의 tonos-cli 경로 설정
