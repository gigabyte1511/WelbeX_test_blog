# Welbex test blog app
Application development test from Welbex. 

### [Go](https://welbe-x-test-blog-lpw3skhpy-gigabyte1511.vercel.app/ "Необязательная подсказка") to the Versel environments to see release version of the application

## Implemented:
### By task
1. User registration and authorization, JWT validation and refresh token when making entries in the DB table
2. A block entry contains the entry date, title, text, picture, and author
3. Implemented pagination both on the Frontend and Backend side
4. Ability to add, edit and delete a post for its author
5. Start records seeded into the database
6. Frontend deployed using Vercel, Backend deployed using Docker and AmasonEC2, SSL certificate installed
7. Manually added API endpoint documentation to the GitHub repo
### Addition
1. Implemented validation of form fields on the Frontend side and validation of request bodies on the Backend side using the "yup" library
2. Hashing user passwords with bcrypt
3. Сhecking new user email for uniqueness during SignUp
### To Be Implemented:
1. Swagger OpenAPI

## API endpoints:
### Posts endpoints:

`GET https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/user/refresh` - refresh JWT tokens.    
`GET https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/post?page=1&limits=20` - get all posts.  
`GET https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/post/count` - get al posts count.  
`POST https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/post` - add new post.  
`PATCH https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/post/:id` - update post by post id.  
`DELETE https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/post/:id` - delete post by post id.  

### Sign endpoints:
`POST https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/user/signUp` - signUp new user.  
`POST https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/user/signIn` - user signIn.  
`GET https://www.amazon-ec2.gigabyte-server.ru/api/v0.1/user/signOut` - user signOut. 

## Technology stack:
### Frontend
* React
* Redux
* React-router-dom
* TanStack Query
* Vite
* TypeScript
* Formik
* Yup 
* Material UI
### Backend
* Node.js
* Express
* Sequelize
* PostgreSQL
* Yup
* jsonwebtoken
* uuid
* bcrypt
* AmazonEC2
* Docker
