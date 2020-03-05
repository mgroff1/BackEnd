# Dev_Desk_Queue  API Doc
-------
## deployed at: https://ddq-backend.herokuapp.com/
## To begin you must generate a token by registering or logging in with a seeded log in.

___


|Register|Login|
|---|---|
|url/auth/register | url/auth/login|
-----
----------

||Seeded login credentials are:||
|---|----|
username:|staff
password:|123
role:|staff
```
ie:
{
    "username":"staff",
    "password":"123",
    "role":"staff"
}
```
---
## Place token in header and use the routes
---


# Ticket Routes
## Method	Endpoint	Description


| GET    | /tickets          | Returns all tickets              |
| ------ | ----------------- |-------------- 
| GET    | /tickets/:id      | Returns ticket by id             |
| GET    | /tickets/user/:id | Returns tickets assigned to user |
| POST   | /tickets          | Creates a new ticket             |
| PUT    | /tickets/:id      | Updates ticket by id             |
| DELETE | /tickets/:id      | Deletes ticket by id             |

# Authentication Routes
## Method	Endpoint	Description

| GET  | /auth/users   | Returns all users        |
| ---- | ------------- | ------------------------ |
| GET  | /users/:id    | Returns user by id       |
| POST | auth/register | Registers a new user     |
| POST | auth/login    | Log in for existing user |

## Users Table
--------------

```
{
     id: integer // Autoincrement by database
     username: String // unique, 50 chars max
     password: String
     role: String 
 }
 ```

## Sample Add user Data
```
 {
    "username": "someone",
    "password": "123123",
    "role": "staff || student",
}
```

## Tickets Table
```
{
    "title": String 255 char max
    "description": String 255 char max
    "category": String 255 char max
    "open":true || false
    "created_at": String 255 Database created timestamp
    "user_id": integer User that created ticket
}
```

## Sample Add Ticket
```
{
    "title": "Bad Return?",
    "description": "Was writing a function and for the return I accidentally returned my girlfriend...",
    "category": "Life",
    "open": "true",
}
```