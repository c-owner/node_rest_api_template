## 세팅



```bash
mkdir src
mkdir src/config
touch src/server.js src/config/config.env
npm install colors dotenv
npm install nodemon --save-dev
```

일반 설치와 ``--save dev` 설치 차이점은 일반 설치는 생산에 필요한 의존성이 들어가는 것. `save dev`는 개발에 필요한 의존향만 설치

- colors : 다양한 콘솔 출력을 위한 패키지
- dotenv : 이 패키지는 로딩 환경 변수에서 시작합니다. env 파일이 프로세스에 들어갑니다. 환경 {variable_name}
- nodemon : 변경사항을 저장할 때마다 서버를 다시 불러오는 데 사용합니다.



`package.json`

```json
{
  "name": "api_campfire_web",
  "version": "1.0.0",
  "description": "campfire_api",
  "main": "src/server.js",
  "scripts": {
    "start": "NODE_ENV=production node src/server.js",
    "dev": "NODE_ENV=development nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "corner",
  "license": "ISC",
  "dependencies": {
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "nodemon": "^2.0.16"
  }
}
```



`server.js`

```js
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: 'src/config/config.env' });

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,
    console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

```

---



**디버깅 및 보안**

```bash
npm install helmet cors
npm install morgan --save-dev
```

- helmet : 이 패키지는 여러 개의 HTTP 헤더를 추가하여 API를 보호
- cors: 이 패키지는 cors 이슈 방지
- morgan : 간단한 HTTP 요청 기록기, 전송된 요청을 노드 컨트롤러에 출력

`server.js` 에 추가

```js
// After the other require statements:
const helmet = require('helmet');
const cors = require('cors');

// Between const app and const PORT:
// Development Setup
if (process.env.NODE_ENV === 'development') {
  // require morgan if in development mode
  // setting morgan to dev: https://www.npmjs.com/package/morgan#dev
  app.use(require('morgan')('dev'));
}

// Put all the server-wide middleware here
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
```

`config.env` 

```
CORS_ORIGIN=http://localhost:8000
```

포트는 웹 응용 개발 프로그램에 따라 다를 수 있음.



프로젝트의 깔끔함과 유지보수성을 유지하기 위해서 폴더, 파일 추가

```bash
mkdir src/routes src/middleware src/controllers
touch src/middleware/notFound.js src/middleware/errorHandler.js src/routes/post.js src/controllers/postsController.js
```

notFound에서 첫 번째 미들웨어 함수를 생성, js는 404 not found 오류를 던져서 정확하지 않은 API 요청을 처리

errorHandler에서 구현 



`server.js`에 추가

```js
// After the other require statements:
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
// Custom middleware here
app.use(notFound);
app.use(errorHandler);
```

### Router

`post.js`

```js
const express = require('express');

const router = express.Router();

// Controller Methods
const { getPosts, getPostById } = require('../controllers/postsController');

router.route('/')
    .get(getPosts);

router.route('/:id')
    .get(getPostById);

module.exports = router;
```

`server.js`

```js
// All routes here
app.use('/api/posts', require('./routes/post'));
```

----

## API Test

`http://localhost:3000/api/posts/post` 







---



## 모델 - 경로 - 컨트롤러 - 서비스 디렉토리 구조

```
├───models
│   ├───user.model.js
├───routes
│   ├───user.route.js
├───services
│   ├───user.service.js
├───controllers
│   ├───user.controller.js
```

모듈 식 코드 구조의 경우 논리는 이러한 디렉터리와 파일로 나누어 져야합니다.

> **모델** - **모델** 의 스키마 정의

> **경로** - API 경로가 컨트롤러에 매핑됩니다.

> **컨트롤러** - 컨트롤러는 요청 매개 변수 확인, 쿼리, 올바른 코드로 응답 보내기의 모든 로직을 처리합니다.

> **서비스** - 서비스에는 데이터베이스 쿼리와 반환 객체 또는 오류 발생이 포함됩니다.

이 코더는 더 많은 코드를 작성하게됩니다. 그러나 결국 코드는 훨씬 더 정비 가능하고 분리 될 것입니다.

## 모델 - 경로 - 컨트롤러 - 서비스 코드 구조

## userModel.js

```js
var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User;
```

## userRoutes.js

```js
var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')

router.get('/', UserController.getUsers)

module.exports = router;
```

## userControllers.js

```js
var UserService = require('../services/user.service')    

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
```

## userServices.js

```js
var User = require('../models/user.model')

exports.getUsers = async function (query, page, limit) {

    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
```



----



## DATABASE

최근까지는 직접 SQL문을 작성하여 쿼리를 날리는 식으로 코드를 짰지만, 최근 많은 논쟁도 있긴 하지만 점유율이 상당하고 대기업에서도 많이 쓰고 있는 ORM을 적용해보고자 한다.

## 01. ORM이란?

> **ORM(Object Relational Mapping) - 객체-관계 매핑의 줄임말**
> 데이터베이스에 있는 데이터를 코드 상의 객체에 대응시켜서, 객체를 다루는 코드를 통해 데이터베이스 작업을 수행할 수 있도록 해주는 기술을 총칭하는 말

## 02. Node에서의 ORM

node.js에서는 **Sequelize** 패키지를 이용해 ORM을 이용하게 된다.

### 1) 설치

```bash
npm install mysql2 sequelize sequelize-cli
```

- mysql2 : node에서 mysql DBMS에 접근하기 위해 필요한 패키지(promise를 사용하기 위해 mysql2사용)-JS와 mysql DBMS 사이에서 SQL문들을 전달하고 결과를 받는 클라이언트 객체의 역할을 해줌
- sequelize : ORM을 이용해 데이터베이스를 다룰 수 있는 패키지
- sequelize-cli : 데이터베이스 관련 작업을 sequelize와 연동해서 터미널에서 직접 수행할 수 있게 해주는 패키지

### 2) 초기화

```bash
npx sequelize init
```

- 해당 작업을 해주면 총 4개의 디렉토리와 파일들이 생성됨
  - config/config.json
  - models/
  - migrations/
  - seeders/

#### config/config.json

해당 파일을 살펴보면 총 3개의 객체로 구성된다.
보통 개인용 프로젝트에서는 데이터베이스를 하나만 사용하지만, 실제로 실무용 프로젝트에서는 개발용, 테스트용, 배포용 데이터베이스를 용도별로 별도로 구분하여 사용하는 경우가 많기 때문에 3가지 설정 정보가 존재한다.

이번엔 `development`만 사용할 것이기 때문에, `development`부분의 `password`를 mysql root계정의 비밀번호로 변경하고, database의 이름은 알맞게 바꿔주면 된다.

```js
{
  "development": {
    "username": "root",
    "password": "내가 지정한 비밀번호",
    "database": "내가 생성할(혹은 존재하는) 데이터베이스 이름",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 3) 데이터베이스 생성

해당 명령어를 사용하면 DB를 생성할 수 있다.

```bash
npx sequelize db:create --env development
```

조금 더 자세히 설명하자면,

- `db:create` - 데이터베이스를 생성하는 명령어

- ```
  --env 사용할 객체
  ```

   

  \- config.json 파일에 있던 3가지 객체 중 어떤 객체를 사용할 지 결정하는 것

  - 예) `db:create --env name` : config.json의 development 객체의 설정대로 디비를 생성하게 된다(json파일의 development객체의 "database"에 적은 이름과 같은 데이터베이스가 생성된다)

### 4) 모델과 테이블 생성

> **기억할 점**
> 데이터베이스의 테이블이 sequelize를 통해 Javascript의 하나의 클래스에 매핑되게 된다. 그리고 테이블의 하나의 row(튜플 혹은 레코드)는 class의 하나의 객체에 매핑되게 된다.

직원 정보를 저장할 테이블(Member)을 만들어보자.
먼저 명령어부터 살펴보자. 조금 길지만 차근차근 따라가보자.

```bash
npx sequelize model:generate --name Member --attributes 
name:string,team:string,position:string,emailAddress:string,
phoneNumber:string,admissionDate:date,birthday:date,profileImage:string
```

- ```
  model:generate
  ```

   

  \- 모델을 생성한다는 명령어

  - 모델 : 하나의 테이블에 대응되는 하나의 클래스를 의미한다

- `--name 모델 이름`

- ```
  --attributes 속성 나열
  ```

  - `속성이름:데이터타입` 형태
  - `id`는 Sequelize에서 기본으로 생성해준다

위 코드를 실행하고 나면 models디렉토리와 migrations 디렉토리에 변화가 생긴다

- models

  - `members.js` 파일이 생성된다

- migrations

  - `생성날짜-작업.js` 파일이 생성된다

  - 위 예시에서는

     

    ```
    20220118010753-create-member.js
    ```

    와 같은 파일이 생성되게 된다.

    - 해당 파일을 통해 테이블을 생성하거나 삭제할 수 있다.

> #### migration란 무엇일까?
>
> 데이터베이스에서 일어나는 모든 변경사항을 의미한다. 예를 들어 테이블 생성, 테이블 컬럼 변경 등이 있다.

- migrations 폴더 내의 각 파일을 살펴보면,

   

  2가지 메소드

  가 공개되어 있다.

  - `up` : migration을 적용할 때 실행
  - `down` : migration을 적용해제할 때 실행
    위 예시에서의 파일을 살펴보자

> **유의**
> 아래 파일의 `createTable()`메소드의 테이블 이름을 보면 `Members`라고 복수로 되어 있다. `Sequelize`에서는 기본적으로 모델을 만들 때 단수로 정했더라도 자동적으로 테이블 이름은 복수로 하게 된다.

```javascript
// 20220118010753-create-member.js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      admissionDate: {
        type: Sequelize.DATE
      },
      birthday: {
        type: Sequelize.DATE
      },
      profileImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};
```

- 이후 해당 명령어를 실행하면 테이블 생성이 완료된다.
  - `npx sequelize-cli db:migrate`
  - 또는 ./models/ 디렉토리 내부의 각 모델 파일들을 완성시킨 후 메인 파일에서 해당 sequelize를 `sync()`시키면 테이블이 없으면 생성하고 있다면 생성하지 않는다.

모델과 테이블 연동, 정보 조회 등에 관련해서는 다음 글에서 다뤄보겠다.

> 참고
>
> - [코드잇](http://codeit.kr/)
> - Sequelize 기본 문서
> - Sequelize-cli 기본 문서







DB 정리

`npm install mysql2 sequelize sequelize-cli  `

`npx sequelize init      `

` npx sequelize db:create --env development    `



```bash
npx sequelize model:generate --name Member --attributes name:string,team:string,position:string,emailAddress:string,phoneNumber:string,admissionDate:date,birthday:date,profileImage:string
```



필요한 컬럼:타입 정의



`npx sequelize-cli db:migrate `

