# 프로젝트 세팅 가이드

## 1. 개발 환경 / 버전 정보

- Node.js : v24.11.1
- npm : 10.x
- Vite : ^7.2.4
- React : ^19.2.0
- React-router-dom : ^7.9.6
- axios : ^1.13.2
- prettier : 3.7.0
- styled-components : ^6.1.19
- styled-reset : ^5.0.0
- zustand : ^5.0.8

### 설치 방법

```
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

## 2. 폴더 구조

```
 src
   ├── apis
   ├── App.jsx
   ├── assets
   │   ├── icons
   │   └── images
   ├── stores
   ├── pages
   ├── components
   ├── hooks
   ├── main.jsx
   ├── Router.jsx
   ├── styles
   └── util
       └── getFormatDate.js
```

## 5. 기타

### VS Code 설정

1. ctrl + , 를 눌러 설정 열기
2. Format On Save 검색하여 활성화
3. Default Formatter 를 Prettier - Code formatter 로 설정
4. Code Actions on Save 의 json 파일 안에 editor.codeActionsOnSave 에
   { "source.fixAll.eslint": true } 로 적기

### 환경변수

- .env 파일 만들기
- .gitignore에 .env 포함하기

### 폰트 && 글로벌 스타일

- pretendard
