# Hacktiv Overflow

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#server

List of basic routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/register` | **POST** | `none` | `fullname: String (`**`Required`**`), email: String (`**`Required`**`), password: String (`**`Required`**`)| Create a user |
| `/login` | **POST** | `none` | `email: String (`**`Required`**`), password: String (`**`Required`**`)` | Login user |


List of user routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/questions` | **GET** | `none` | `none` | Get all questions |
| `/questions/:id` | **GET** | `none` | `none` | Get detail question |
| `/questions` | **POST** | `token` | `title: String (`**`Required`**`), description: String(`**`Required`**`),  tags: Array (`**`Required`**`)` | Post a question |
| `/questions/:id` | **PUT** | `token` | `title: String (`**`Required`**`), description: String(`**`Required`**`),  tags: Array (`**`Required`**`)` | Update a question |
| `/questions/:id` | **DELETE** | `token` | `none` |  Delete question |
| `/questions/:id/votes` | **PUT** | `token` | `status: ('upvote' / 'downvote')` | Vote question |
| `/questions` | **POST** | `token` | `title: String (`**`Required`**`), description: String(`**`Required`**`),  tags: Array (`**`Required`**`)` | Post a question |
| `/answers/:questionId` | **POST** | `token` | `answer: String(`**`Required`**`)` | Update a question |
| `/answers/:id` | **PUT** | `token` | `answer: String(`**`Required`**`)` | Update answer |
| `/answers/:id` | **DELETE** | `token` | `none` |  Delete answer |
| `/answers/:id/votes` | **PUT** | `token` | `status: ('upvote' / 'downvote')` | Vote answer |


## Usage

Make sure you have **Node.js** and **npm** installed in your computer, and then run these commands:
```
$ npm install
$ npm start
```
