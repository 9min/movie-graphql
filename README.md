# movie-graphql

[https://movie-graphql.herokuapp.com](https://movie-graphql.herokuapp.com)

**실행 방법 (서버 + 클라이언트)**

1. npm install
2. npm run dev

## Movie API with GraphQL

**실행 방법 (서버만)**

1. npm install
2. npm start
3. localhost:5000/graphql

**영화 점수 5점 이상인 것들 최대 3개까지만 가져오기**

```graphql
query {
  movies(limit:3, minimum_rating:5) {
    id
    title
    rating
    medium_cover_image
  }
}
```

**영화 하나 고르고 추천 영화까지 함께 받기**

```graphql
query {
  movie(movie_id:7893) {
    id
    title
    rating
    summary
    description_full
    language
    medium_cover_image
  }
  suggestions(movie_id:7893) {
    title
    rating
  }
}
``` 

참고: [나의 첫번째 GraphQL 서버 만들기](https://www.youtube.com/watch?v=3PZGW5Iwtv4&list=PL7jH19IHhOLOpU_yAYzCO4iQNvdou1AnK)

## Client for the MovieQL API built with Apollo

**실행 방법 (클라이언트만)**

1. 서버 실행
2. cd client
3. npm install
4. npm start

참고: [Apollo & GraphQL로 영화 웹앱 만들기](https://www.youtube.com/watch?v=ZqNFgnlGx78&list=PL7jH19IHhOLOVNxdXbPqcOweev3NuI527)

## Heroku에 올리는 방법

1. [Heroku 가입](http://herokuapp.com)
2. [Heroku CLI 설치](https://devcenter.heroku.com/articles/heroku-cli)
3. 프로젝트 폴더로 이동
4. `$ heroku login`
5. `$ heroku create 저장소이름`
6. `$ git add .`
7. `$ git commit -m "message"`
8. `$ git push heroku master`
9. `$ heroku open`
