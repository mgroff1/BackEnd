Ticket Routes
Method	Endpoint	Description

GET	/tickets	Returns all tickets
GET	/tickets/:id	Returns ticket by id
GET	/tickets/user/:id	Returns tickets assigned to user
POST	/tickets	Creates a new ticket
PUT	/tickets/:id	Updates ticket by id
DELETE	/tickets/:id	Deletes ticket by id

Authentication Routes
Method	Endpoint	Description

GET	/users	Returns all users
GET	/users/:id	Returns user by id
POST	/register	Registers a new user
POST	/login	Log in for existing user
Users Table
{
     id: integer // Autoincrement by database
     username: String // unique, 50 chars max
     password: String
     role: String
 }
Sample Add user Data
 {
    "username": "someone",
    "password": "123123",
    "role": "staff || student",
}

Tickets Table
{
    "title": String 255 char max
    "description": String 255 char max
    "category": String 255 char max
    "open":true || false
    "assigned_user": integer Default 0
    "created_at": String 255 Database created timestamp
    "user_id": integer User that created ticket
}
Sample Add Ticket
{
    "title": "Bad Return?",
    "description": "Was writing a function and for the return, I accidentally returned my girlfriend...",
    "category": "Life",
    "open": "true",
    "assigned_user": "0"  
}