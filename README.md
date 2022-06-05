## Intro

**Node Express Framework**로 구성한 프로젝트 API 템플릿입니다. REST 구조로 만들어보았고

Base가 되어줄 프로젝트로 만들었습니다. 



- mysql을 기본으로 세팅해둔 버전입니다.
- MySQL Database가 설치되어있거나 설치된 환경이 필요합니다.
- Sequelize ORM도 추가하였습니다. **(+🔨 update)**



auth : corner 🙇🏻‍♂️

version : 1.0.0



> 💡 Node Express 구조에서 ORM을 써서 작업했기 때문에 service 구조까지 만들 필요가 없다고 느꼈습니다.  
>
> Sequelize를 사용하지 않는다면 `my-sql-연동` 브랜치에 있는 소스 구조를 사용하길 제안합니다. 

## SET UP



프로젝트를 받은 뒤 `npm install`을 수행합니다.



```bash
cd app
sequelize db:create --env development
```



## Usage Package

```bash
npm install express colors cors dotenv mysql2
npm install nodemon cross-env --save -dev
```

**패키지 설명**

- colors : 콘솔에 컬러 효과를 넣어줍니다. 조금 더 시각적인 효과로 쉽게 확인할 수 있습니다.
- dotenv : 환경설정을 하기위한 env 설정을 할 수 있습니다.
- cors : 브라우저의 cors 이슈를 막기위한 패키지입니다.
- mysql2 : mysql DB연동을 하기 위한 패키지입니다.
- nodemon : 서버가 변경될 때 저장할 때마다 재시작 필요없이 바로 반영해줍니다.

```json
{
"scripts": {
    "start": "NODE_ENV=production node server.js",
    "dev": "NODE_ENV=development nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

---

## Structural Design Project

```
project
|
├───server.js
├───package.json
├───app/
│   ├───config
│   ├					 ㄴㅡㅡㅡㅡconfig.env
│   ├					 ㄴㅡㅡㅡㅡdb.config.js
│   ├───controller
│   ├					 ㄴㅡㅡㅡㅡcontroller.js
│   ├───middleware
│   ├					 ㄴㅡㅡㅡㅡnotFound.js
│   ├					 ㄴㅡㅡㅡㅡerrorHandler.js
│   ├───models
│   ├					 ㄴㅡㅡㅡㅡdb.js
│   ├					 ㄴㅡㅡㅡㅡmodel.js
│   ├───routes
│   ├					 ㄴㅡㅡㅡㅡroute.js
```

- server.js : 서버를 구동시키고 기본적인 서버 환경 설정을 합니다.
- config : 주로 환경 설정을 가지고 있습니다.
  - db.config.js : database 연결에 필요한 정보를 가지고 있습니다.
- routes : 사용자가 어떠한 요청을 보낼 수 있도록 path를 설정합니다.
- controller : 라우터에서 해당 요청이 들어오면 어떤 응답을 콜백할지 처리 합니다.
- middleware : 잘못된 접근으로 들어올 404 Not Found 처리를 사용하기 위한 에러 처리를 했습니다.
- models : model.js는 DB 테이블에 있는 컬럼을 객체로 정의해두는 곳입니다. 
  - db.js는 model.js에서 해당 db로 접근하여 조회할 수 있도록 세팅된 파일입니다. 
