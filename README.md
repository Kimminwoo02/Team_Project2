# jumunmoa

주문모아

## 🚀 실행?

Web Express 서버와 React.js 개발용 dev server를 2개를 같이 띄우고 작업
~~~sh
npm install or yarn install

yarn dev:client // default port: 8080
yarn dev:server // default port: 3000
~~~

![Screen Shot 2022-02-12 at 04 05 19 AM](https://user-images.githubusercontent.com/74804564/153653776-eda31d16-3def-42f6-82f9-7091351ec4ff.png)

<br />

**📎 DB 접속 경로가 다른 경우**    
.env 환경변수 이용
~~~sh
DB_URI=mongodb://localhost:27017/jumunmoa
or
DB_URI=mongodb://{username}:{password}@localhost:27017/jumunmoa
~~~


<br/>

## ⚙️ 환경

### 백엔드

#### Frameworks
- **Web**
  - Express

- **Database**
  - Mongoose

<br />

### 프론트엔드

#### FrameWorks
- **State**
  - Mobx

#### Libraries
- **Style**
  - Emotion

<br />

---

<br />

## 🔎 테스트
Jest

<br />

---

<br/>

## 🗂 폴더 구조 (대략적인 방향만)
- src
  - client (프론트엔드)
    - pages
    - components
    - stores
    - hooks
    - lib
  - server (서버)
    - models
    - routes


