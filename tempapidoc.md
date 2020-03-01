

	PUT /users/tickets/:id/resolve
    
	PUT /users/tickets/:id/reassign

    GET /users/tickets

    DELETE /users/tickets/:id

POST /users/tickets/:id/assign

GET /tickets/open

POST /tickets

POST /auth/register

POST /auth/login

 HTTP/1.1 200 OK
{
  "message": "Welcome lambdastudent!",
  "id": 1,
  "username": "lambdastudent",
  "role": "student",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImplZmYiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU3MTY5MjU2OCwiZXhwIjoxNTcxNzAzMzY4fQ.szvk7Z1GqU9vPD8Jaj_4fkIXgpWVfmF9GipThZhGKjQ"
}

There is a staff login =>  username: admin
                           password: 123

                           studentlogin 
                           username: student
                           password: 123


/**
 *
 * @api {post} /auth/register Register new user
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 * @apiParam {String} role User role
 *
 * @apiSuccess {Number} id User ID
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} role User's role
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "username": "lambdastudent",
 *    "password": "password",
 *    "role": "student"
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6ImpvbW15MTIzNDUiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU3MTc2MDgxNiwiZXhwIjoxNTcxNzcxNjE2fQ.a10a8lxnffq8b_T3SnV7500WfZxbeg6obJnEJYMVLnQ"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 * {
 *   "id": 1,
 *   "username": "lambdastudent",
 *   "role": "student"
 * }
 * 
 * @apiError MissingParameters Missing required parameters
 *
 * @apiErrorExample {json} Missing required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Missing user parameters"
 *  }
 * 
 * @apiError InvalidParameter Invalid parameter
 *
 * @apiErrorExample {json} Invalid parameter sent
 *  HTTP/1.1 400
 *  {
 *    "message": "Invalid role being sent"
 *  }
 *
 * @apiError MissingParameters Missing required parameters
 *
 * @apiErrorExample {json} Register error
 *  HTTP/1.1 500 Internal Server Error
 *
 */


 /**
 *
 * @api {post} /auth/login Login user
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} message Welcome message
 * @apiSuccess {Number} id User's ID
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} token User's Authorization token
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "username": "lambdastudent",
 *    "password": "password"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Welcome lambdastudent!",
 *   "id": 1,
 *   "username": "lambdastudent",
 *   "role": "student",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImplZmYiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU3MTY5MjU2OCwiZXhwIjoxNTcxNzAzMzY4fQ.szvk7Z1GqU9vPD8Jaj_4fkIXgpWVfmF9GipThZhGKjQ"
 * }
 *
 * @apiError InvalidCredentials Invalid user credentials
 *
 * @apiErrorExample {json} Invalid credentials
 *  HTTP/1.1 401
 *  {
 *    "message": "Invalid user credentials"
 *  }
 * 
 * @apiError MissingParameters Missing required parameters
 *
 * @apiErrorExample {json} Login error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

 /**
 *
 * @api {delete} /users/tickets/:id Delete a ticket
 * @apiName DeleteTicket
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Ticket ID
 *
 * @apiSuccess (200) {String} message Success message
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "Ticket deleted successfully."
 *  }
 * 
 * @apiError InvalidUser Invalid user ID,
 *
 * @apiErrorExample {json} Invalid user ID
 *  HTTP/1.1 400
 *  {
 *    "message": "Only the student that submitted the ticket may delete it."
 *  }
 *
 * @apiError TicketNotFound Ticket not found.
 *
 * @apiErrorExample {json} Ticket not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Ticket could not be found."
 *  }
 * 
 * @apiError InvalidRole Role not valid.
 *
 * @apiErrorExample {json} Invalid role
 *  HTTP/1.1 400
 *  {
 *    "message": "Deleting tickets is restricted to students."
 *  }
 * 
 * @apiErrorExample {json} Delete error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

 /**
 *
 * @api {put} /users/tickets/:id/reassign Reassign a ticket
 * @apiName ReassignTicket
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Ticket ID
 *
 * @apiSuccess (200) {Number} id Reassigned ticket ID
 * @apiSuccess (200) {String} title Reassigned ticket title
 * @apiSuccess (200) {String} description Reassigned ticket description
 * @apiSuccess (200) {String} solution Reassigned ticket solution (set to null)
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "title": "How do I into Node?",
 *    "description": "No seriously I don't get it.",
 *    "solution": null
 *  }
 * 
 * @apiError InvalidAssignment Invalid assignment,
 *
 * @apiErrorExample {json} Invalid ticket assignment
 *  HTTP/1.1 400
 *  {
 *    "message": "Cannot reassign ticket if it is not assigned to you."
 *  }
 *
 * @apiError TicketNotFound Ticket not found.
 *
 * @apiErrorExample {json} Ticket not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Ticket not found (invalid assignment)"
 *  }
 * 
 * @apiError InvalidRole Role not valid.
 *
 * @apiErrorExample {json} Invalid role
 *  HTTP/1.1 400
 *  {
 *    "message": "Ticket updating restricted to helpers."
 *  }
 * 
 * @apiErrorExample {json} Update error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

 /**
 *
 * @api {put} /users/tickets/:id/resolve Resolve a ticket
 * @apiName ResolveTicket
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Ticket ID
 *
 * @apiSuccess (200) {Number} id Assigned ticket ID
 * @apiSuccess (200) {String} title Assigned ticket title
 * @apiSuccess (200) {String} description Assigned ticket description
 * @apiSuccess (200) {String} solution Assigned ticket solution
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *    "solution": "Cant Fix You"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "title": "How do I into Node?",
 *    "description": "No seriously I don't get it.",
 *    "solution": "This is a solution"
 *  }
 * 
 * @apiError InvalidAssignment Invalid assignment,
 *
 * @apiErrorExample {json} Invalid ticket assignment
 *  HTTP/1.1 400
 *  {
 *    "message": "Cannot mark ticket as resolved if it is not assigned to you."
 *  }
 *
 * @apiError TicketNotFound Ticket not found.
 *
 * @apiErrorExample {json} Ticket not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Ticket not found (invalid assignment)"
 *  }
 * 
 * @apiError InvalidRole Role not valid.
 *
 * @apiErrorExample {json} Invalid role
 *  HTTP/1.1 400
 *  {
 *    "message": "Ticket updating restricted to helpers."
 *  }
 * 
 * @apiError MissingTicketParameter No solution provided.
 *
 * @apiErrorExample {json} No solution provided
 *  HTTP/1.1 400
 *  {
 *    "message": "Resolved tickets should include a solution."
 *  }
 * 
 * @apiErrorExample {json} Update error
 *  HTTP/1.1 500 Internal Server Error
 *
 */
