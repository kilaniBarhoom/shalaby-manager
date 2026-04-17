> [!WARNING]
> **Service currently unavailable**
> PennyPath is temporarily offline due to the ongoing MongoDB Atlas Middle East data center outage.
> The live demo at [pennypath2.vercel.app](https://pennypath2.vercel.app) will not function until
> the database service is restored. You can still run the project locally using your own MongoDB URI.
> Apologies for the inconvenience.

## An Expense tracker app
```
PennyPath is a customized expense tracker app, to keep track of expenses 
and payments, offering unique design and flawless experience.
```
## Website
<a href="https://pennypath2.vercel.app">Click here to view website</a>
- Email
```
demo@mail.com
```
- Password
```
12345678
```


## Preview
  - `Login Page`
  
![image](https://github.com/user-attachments/assets/5dabcdd6-5339-4290-af46-4ed37bf17566)



  - `Register Page`
  
![image](https://github.com/user-attachments/assets/408b77ca-4908-4673-a1ab-f18858c8a40e)



---
- `Dashboard Page: Analytics and charts`
  
![image](https://github.com/user-attachments/assets/a18e8351-6db3-4175-bf4e-2664a08e96be)


![image](https://github.com/user-attachments/assets/22886e8e-58e4-45ee-ad7c-6256c8f54b1f)


![image](https://github.com/user-attachments/assets/50c329d6-a0c8-4cc5-a3ad-a4875507f3e2)

---
- `Payments Page: View of all payments`
  
![image](https://github.com/user-attachments/assets/2e563309-7a72-423b-b5d9-174967183b8e)

---
- `Expenses Page: View of all expenses`
  
![image](https://github.com/user-attachments/assets/892f8025-c3c4-46be-b6cf-7326a7272451)

---
- `Light Mode`
  
![image](https://github.com/user-attachments/assets/ebe6f519-f9fe-4c56-bb40-dac0b8e8f62e)


---
- `Arabic Language`
  
![image](https://github.com/user-attachments/assets/323d0cf4-5482-4765-bdf1-63bda3e0eb40)



## Tech Stack

**`Client (Front End):`** 

- bun
- React,
- TailwindCSS,
- React Hook Form,
- Zod,
- Nyxb UI,
- framer motion,

**`Server (Back End):`** 

- node,
- Express js,
- mongodb,
- Zod,
- BcryptJS,
- JsonWebToken,
- sessions
</br>


## Models definitions

- **User**: is the **Worker** that is allowed to access the app, and perform the actions that are allowed to them.
  - **fullNameArabic**`*`: is the full name in arabic name of the user.
    - **fullNameEnglish**`*`: is the full name in english name of the user.
  - **email**: is the email of the user.
  - **phone**: is the phone number of the user.
  - **secondaryPhone**: is the secondary phone number of the user in case primary one is unreachable.
  - **password**`*`: is the password of the user.
  - **active**: is a flag that is set to decide whether the user is allowed to log in or not.
  - **role**: are the different roles that a **User** can have, different roles give the ability to do more or less actions they can perform.
    1. **Spectator**: can only view his own attendances and change his password.
    2. **User**: can view all the payments, attendances, but can't edit anything besides his password.
    3. **Admin**: can do what a **User** can do, and can add new records, but with restricted deletion and editing abilities, where he can't update or delete a user.
    4. **Superadmin**: The highest level of access can do anything.

- **Payment**: is the payment method that is used to pay the **user** at the end of the month.
  - **date**`*`: is the date that this payment made.
  - **amount**`*`: is the amount that is payed.
  - **user**: is an user that this payment is made out to.

- **Expense**: is the payment method that is used to pay the **user** at the end of the month.
  - **name**`*`: is the name of the expense eg: travel.
  - **description**`*`: is the description of the expense.
  - **date**`*`: is the date that this payment made.
  - **amount**`*`: is the amount that is payed.
  - **user**: is an user that this payment is made out to.
  - **category**: the category that the expnese is categorized to.
    
- **Session**: is the record of the sessions that are made by the users.
  - **refreshToken**`*`: is the refresh token that is used to generate new access tokens.
  - **user**`*`: is the user that the refresh token is associated with.
  - **expiresAt**`*`: is the date that the refresh token expires.
- `*`Required field
  
- When a worker gets deleted, all the logs that are associated with that worker are also deleted.
- When a user logout his refresh token is revoked, and all the cached data is revalidated.


## Features
1. Key Features
- Overall
     - [x]  Store daily expenses and list them organized and sorted all in one place.
  - [x]  Add payments and monthly wages.
  - View analytics of daily expenses with charts and cards.
  - [x]  Accounts are created via admin
  - [x]  Ability to search for data.
  - [x]  Filtering functionality
  - [x]  Light/dark theming

2. Secondary Features (Non functional)
- [x]  Debounced Search for optimized search query.
- [x]  Caching data, so that there is no need to refresh the page to update (optimistic updates).
- [x]  Authorization roles for different roles in the system.
- [x]  Authorized component rendering.
- [x]  Persistent login using sessions and cockies from the server, to make use of the refresh token which is stored in the cookies of the brouser.
- [x]  Make use of thre Mongodb aggregate functions, which pass the query into multiple stages retrieving data faster.  



## Environment Variables
```
To run this project, you will need to add the
 following environment variables to your .env file
```
__Go to the .env.example files in each of the folders (client / server).__

- In `/server` Fill the `.env.config` file with the needed information from .env.example, and rename it to `.env`
  - `PORT`: is the port that the server is running on (eg: `3000`)
  - `CLIENT_URL`: is the URL of the client (used to set the cors).
  - `FIXED_DEDUCTION`:No need for this key.
  - `PORT`: is the port that the server will run on.
  - `DB_URI`: is the URI of the MongoDB database.
  - Auth: JWT - Cookies
    - `JWT_SECRET`: is the secret that is used to sign the JWT access tokens.
    - `JWT_ACCESS_TOKEN_EXPIRE`: is the expiration time of the JWT access tokens.
    - `JWT_REFRESH_SECRET`: is the secret that is used to sign the JWT refresh tokens.
    - `JWT_REFRESH_SECRET_EXPIRE`: is the expiration time if the JWT refresh token and the max-age of the cookie.
     - `NODE_ENV`: is the environment that the server will run on. [dev, prod]
    - `COOKIE_EXPIRE_TIME`: is the expiration time of the cookie set to the session of the browser (`7`)
  - `CLIENT_URL`: is the URL of the client app for cors, use space between multiple URLs. (`http://localhost:3000`)
  - Admin Account: Initial Admin Account, will run only when there are no users in the database at the moment of the server start.
   
    - `ADMIN_EMAIL`: is the email of the admin account.
    - `ADMIN_FULL_NAME_ENGLISH`: is the full name of the admin account id english.
    - `ADMIN_FULL_NAME_ARABIC`: is the full name of the admin account in arabic.
    - `ADMIN_PASSWORD`: is the password the admin account.
- In `/client/` Fill the `.env.example` file with the needed information and rename it to `.env`
  - `VITE_API_URL`: is the URL of the server and the prefix e.g: https://api.example.com/api/v2.
  -
- Run directly on your machine
  - Backend:
    - Run `npm install` to install all the needed dependencies
    - Run `npm run dev` to start the server in development mode 
  - Frontend:
    - Run `bun install` to install all the needed dependencies
    - Run `bun run dev` to start the client in development mode (vite)
    - Run `bun run build` to build the client for production# API Routes

### Auth

| Method | Route         |
| ------ | ------------- |
| POST   | /auth/login         |
| POST   | /auth/refreshToken |
| DELETE | /auth/logout  |

### Users

| Method | Route                  |
| ------ | -----------------------|
| POST   | /user                  |
| GET    | /user?search=          |
| GET    | /user/all          |
| PUT    | /user/:userID          |
| DELETE | /user          |
|      **Change Role**|           | 
| PATCH  | /user/:userID          | 
| PUT  | /user/update-password         | 
| PUT  | /user/toggle-activate/:userId         | 

### Payments

| Method | Route                     |
| ------ | ------------------------- |
| POST   | /payment                     |
| GET    | /payment?search= |
| GET    | /payment/:paymentId              |
| PUT    | /payment/:paymentId              |
| DELETE | /payment/:paymentId              |

### Expenses

| Method | Route            |
| ------ | ---------------- |
| POST   | /expense          |
| GET    | /expense?search=&...  |
| GET    | /expense/:expenseId |
| PUT    | /expense/:expenseId |
| DELETE | /expense/:expenseId |
