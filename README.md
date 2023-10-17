<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Tech Stack

- [Nest](https://github.com/nestjs/nest)
- TypeORM
- Sqlite3

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 요구사항

- [x] 1. 채용공고 등록
- [x] 2. 채용공고 수정
- [x] 3. 채용공고 삭제
- [x] 4. 채용공고 목록
  - [x] 4.1. 목록 가져오기
  - [x] 4.2. 검색기능 구현
- [x] 5. 채용 상세 페이지
- [ ] 6. 사용자는 채용공고에 지원

## 필수 기술요건

- ORM 사용하여 구현.
- RDBMS 사용 (SQLite, PostgreSQL,MySql 등).

## 채용공고 CRUD

### 등록

```ts
@Post('recruitment')
async create(@Body() request: CreateRecruitmentDto) {
  const createdRecruitmentId =
    await this.recruitmentService.createRecruitment(request);
  return this.recruitmentService.findOneRecruitmentById(createdRecruitmentId);
}
```

- Request

  ```txt
  POST: localhost:3000/recruitment
  ```

  ```json
  {
    "name": "원티드랩",
    "position": "백엔드",
    "reward": 200000,
    "skill": "Django",
    "content": "채용 중입니다."
  },
  ```

- Response

  ```json
  {
    "name": "원티드랩",
    "country": "서울",
    "district": "분당",
    "position": "백엔드",
    "reward": 200000,
    "skill": "Django",
    "content": "채용 중입니다."
  }
  ```

### 수정

```ts
@Patch('recruitment/:id')
async updateRecruitmentById(
  @Param('id') id: string,
  @Body() request: UpdateRecruitmentDto,
) {
  await this.recruitmentService.updateRecruitment(+id, request);
  return this.recruitmentService.findOneRecruitmentById(+id);
}
```

- Request

  ```txt
  PATCH: localhost:3000/recruitment/3
  ```

  ```json
  {
    "name": "원티드랩",
    "position": "백엔드",
    "reward": 200000,
    "skill": "TS",
    "content": "채용 중입니다.(수정됨)"
  },
  ```

- Response

  ```json
  {
    "name": "원티드랩",
    "country": "서울",
    "district": "분당",
    "position": "백엔드",
    "reward": 200000,
    "skill": "TS",
    "content": "채용 중입니다.(수정됨)"
  }
  ```

### 삭제

```ts
@Delete('recruitment/:id')
async removeRecruitment(@Param('id') id: string) {
  await this.recruitmentService.deleteRecruitmentById(+id);
  return await this.recruitmentService.findAllRecruitments();
}
```

- Request

  ```txt
  DELETE: localhost:3000/recruitment/2
  ```

- Response

  ```json
  [
    {
      "id": 3,
      "name": "원티드랩",
      "country": "서울",
      "district": "분당",
      "position": "백엔드",
      "reward": 200000,
      "skill": "TS"
    },
    {
      "id": 4,
      "name": "원티드랩",
      "country": "서울",
      "district": "분당",
      "position": "백엔드",
      "reward": 200000,
      "skill": "Django"
    },
    //...
    {
      "id": 7,
      "name": "원티드코리아",
      "country": "한국",
      "district": "서울",
      "position": "프론트엔드",
      "reward": 200000,
      "skill": "JS"
    }
  ]
  ```

### 읽기

#### 목록 가져오기

```ts
@Get('recruitments')
async findAll() {
  return this.recruitmentService.findAllRecruitments();
}
```

- Request

  ```txt
  GET: localhost:3000/recruitments
  ```

- Response

  ```json
  [
    {
      "id": 3,
      "name": "원티드랩",
      "country": "서울",
      "district": "분당",
      "position": "백엔드",
      "reward": 200000,
      "skill": "TS"
    },
    {
      "id": 4,
      "name": "원티드랩",
      "country": "서울",
      "district": "분당",
      "position": "백엔드",
      "reward": 200000,
      "skill": "Django"
    },
    //...
    {
      "id": 7,
      "name": "원티드코리아",
      "country": "한국",
      "district": "서울",
      "position": "프론트엔드",
      "reward": 200000,
      "skill": "JS"
    }
  ]
  ```

#### 검색 기능

```ts
@Get('recruitments/search')
async findRecruitments(@Query() request: RecruitmentsFiltersDto) {
  return this.recruitmentService.findRecruitmentsWithFilters(request);
}
```

```txt
GET: localhost:3000/recruitments/search?(name= or position= )
```

- Request

  ```
  GET: localhost:3000/recruitments/search?position=프론트엔드
  ```

- Response

  ```json
  [
    {
      "id": 7,
      "name": "원티드코리아",
      "country": "한국",
      "district": "서울",
      "position": "프론트엔드",
      "reward": 200000,
      "skill": "JS"
    },
    {
      "id": 8,
      "name": "원티드랩",
      "country": "서울",
      "district": "분당",
      "position": "프론트엔드",
      "reward": 200000,
      "skill": "JS"
    },
    {
      "id": 9,
      "name": "로켓펀치",
      "country": "한국",
      "district": "판교",
      "position": "프론트엔드",
      "reward": 200000,
      "skill": "JS"
    }
  ]
  ```

#### 상세 페이지

```ts
@Get('recruitment/:id')
async findOne(@Param('id') id: string) {
  return this.recruitmentService.findOneRecruitmentById(+id);
}
```

- Request

  ```
  GET: localhost:3000/recruitment/3
  ```

- Response

  ```json
  {
    "name": "원티드랩",
    "country": "서울",
    "district": "분당",
    "position": "백엔드",
    "reward": 200000,
    "skill": "TS",
    "content": "채용 중입니다.(수정됨)"
  }
  ```
