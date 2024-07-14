# BSN (Book Social Network)  

BSN is book sharing and management full-stack application. User can create their own book collection and share their book with community. Including, CRUD operations and authentication with user email verification, shareable and archive book and also feedback system. Overall, this project is design with minimalist and focus on high performance and security.

## Tech stack

- Spring Boot 3 (Backend)
- Angular 18 (Frontend)
- Spring Security and Maildev (Email Authentication and JWT Authorization)
- Docker
- PostgresSQL
- Tailwind + DaisyUI (Design)
- Swagger + OpenAPI (API Documentation)

## Installation
1. Clone the repo from GitHub
```shell
git clone https://github.com/Kei-K23/book-social-network.git
cd book-social-network
```

2. First Docker install in your machine. And run following command in root directory
```shell
docker-compose up -d
```
It will install all require PostgresSQL and Maildev images.

3. Change terminal directory to `book-network-ui` and install requires node modules packages 
```shell
cd book-network-ui
npm install
```

4. 
