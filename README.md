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
