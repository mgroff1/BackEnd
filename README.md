
First you must either login with a seeded user or register. You will generate a JWT token 
that will go in your header, at that point the routes open up to you. 


Docs can be found here:
https://documenter.getpostman.com/view/10125305/SzRuYXAP

deployed at:
https://ddq-backend.herokuapp.com/



************************************************************************
User functions
************************************************************************
function findBy(filter) {
  return db('users').where(filter);
}

async function findStudentTickets(id) {
  return await db('student_tickets as st')
    .where('student_id', id)
    .join('tickets as t', 'st.ticket_id', 't.id')
    .select(
      'st.ticket_id',
      't.title',
      't.description',
      't.tried',
      't.category',
      't.solution'
    );
}

async function add(user) {
  return await db('users')
     .insert(user, 'id')
    .then(([id]) => findById(id));
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'role')
    .where({ id })
    .first();
}

async function findStudentTicketById(ticket_id) {
  return await db('student_tickets')
    .select('id', 'student_id', 'ticket_id')
    .where({ ticket_id })
    .first();
}

async function removeAssignedTicket(ticket_id) {
  return await db('assigned_tickets')
    .where({ ticket_id })
    .del();
}

async function removeStudentTicket(ticket_id) {
  return await db('student_tickets')
    .where({ ticket_id })
    .del();
}





************************************************************************
Ticket functions
************************************************************************
function find() {
    return db('tickets');
}

function findBy(filter) {
    return db('tickets').where(filter);
}

async function add(ticket) {
    return await db('tickets')
    .insert(ticket, 'id')
    .then(([id]) => findById(id));
}

async function addTicketToStudent(student_id, ticket_id) {
    return await db('student_tickets')
        .insert({ student_id, ticket_id}, 'id')
        .then(() => findById(ticket_id));
}

async function remove(id) {
    return await db('tickets')
        .where({ id })
        .del();
}

async function update(id, changes) {
    return await db('tickets')
        .where({ id })
        .update(changes)
        .then(() => findById(id));
}

function findById(id) {
    return db('tickets')
      .select('id', 'title', 'description')
      .where({ id })
      .first();
}


devdesk_api
Comments(0)
Add a description...
POST
Trying anything without JWT in header
Comments(0)
https://ddq-backend.herokuapp.com/auth/register
regester a user

Headers
Content-Type	application/json
Bodyraw (application/json)
{
	
	"username":"dough",
	"password":"123",
	"role":"staff"
}
Example Request
http://localhost:5150/auth/register
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":"dough","password":"123","role":"staff"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5150/auth/register", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
Example Response201 Created
{
  "id": 1,
  "username": "dough",
  "role": "staff",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImRvdWdoIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNTgzMTA1MDkxLCJleHAiOjE1ODMxMTU4OTF9.3jq5nnCGfliqT5FHtEvBCPciZS3lw2wtKcrpOfo3GIM"
}
POST
User login
Comments(0)
https://ddq-backend.herokuapp.com/auth/login?
Use to login

username:staff password:123 role:staff

Headers
Content-Type	application/x-www-form-urlencoded
Params
jwt	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImRvdWdoIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNTgzMTA1MDkxLCJleHAiOjE1ODMxMTU4OTF9.3jq5nnCGfliqT5FHtEvBCPciZS3lw2wtKcrpOfo3GIM
Bodyraw (application/x-www-form-urlencoded)
{
	
	"username":"staff",
	"password":"123",
	"role":"staff"
}


Example RequestUser login
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var raw = "{\n	\n	\"username\":\"staff\",\n	\"password\":\"123\",\n	\"role\":\"staff\"\n}\n\n\n";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://ddq-backend.herokuapp.com/auth/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
Example Response500 Internal Server Error
{}
POST
staff login example
Comments(0)
https://ddq-backend.herokuapp.com/auth/login
this is a seeded user that can be used to login and check the routes. You will login with these credentials, that will generate a jwt token that you will put in the header to move around between routes.

Headers
Content-Type	application/json
Authorization	
Bodyraw (application/json)
{
	"username":"staff",
	"password":"123",
	"role":"staff"
}
Example Requeststaff login example
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":"staff","password":"123","role":"staff"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://ddq-backend.herokuapp.com/auth/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
GET
GET users
Comments(0)
https://ddq-backend.herokuapp.com/users
request a list of users (must have jwt in header)

Headers
Content-Type	application/json
Authorization	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InN0YWZmIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNTgzMzIyNTE3LCJleHAiOjE1ODMzMzMzMTd9.4sZ1EYKbI8PQB9KWLFfepz4D-IdkMv3JAf-iiGnLYac
Bodyraw (application/json)
{
	"username":"staff",
	"password":"123",
	"role":"staff"
}
Example RequestGET users
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InN0YWZmIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNTgzMzIyNTE3LCJleHAiOjE1ODMzMzMzMTd9.4sZ1EYKbI8PQB9KWLFfepz4D-IdkMv3JAf-iiGnLYac");

var raw = JSON.stringify({"username":"staff","password":"123","role":"staff"});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://ddq-backend.herokuapp.com/users", requestOptions)
  .then(response => response.text())
Example Response200 OK
{
  "users": [
    {
      "id": 1,
      "username": "staff",
      "role": "staff"
    },
    {
      "id": 2,
      "username": "dough",
POST
student register
Comments(0)
https://ddq-backend.herokuapp.com/auth/register
Add a description...
Headers
Content-Type	application/json
Authorization JWT
{
	
	"username":"Judy",
	"password":"666",
	"role":"student"
}
Example Request
http://localhost:5150/auth/register
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":"dough","password":"123","role":"staff"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5150/auth/register", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
Example Response201 Created
{
  "id": 1,
  "username": "dough",
  "role": "staff",
}
GET
Trying anything without JWT in header
Comments(0)
https://ddq-backend.herokuapp.com/tickets
Must generate a JWT and place it in header before you can do anything else..

Headers
Content-Type	application/json
Bodyraw (application/json)
{
	
	"username":"dough",
	"password":"123",
	"role":"staff"
}
Example Request
http://localhost:5150/auth/register
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":"dough","password":"123","role":"staff"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5150/auth/register", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
Example Response201 Created
{
  "id": 1,
  "username": "dough",
  "role": "staff",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImRvdWdoIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNTgzMTA1MDkxLCJleHAiOjE1ODMxMTU4OTF9.3jq5nnCGfliqT5FHtEvBCPciZS3lw2wtKcrpOfo3GIM"
}