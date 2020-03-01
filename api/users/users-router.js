const router = require('express').Router();

const Tickets = require('../tickets/tickets-model.js');
const Users = require('./users-model.js');

/**
 *
 * @api {post} /users/tickets/:id/assign Assign a ticket
 * @apiName AssignTicket
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Ticket ID
 *
 * @apiSuccess (200) {Number} ticket_id Assigned ticket ID
 * @apiSuccess (200) {String} title Assigned ticket title
 * @apiSuccess (200) {String} description Assigned ticket description
 * @apiSuccess (200) {String} tried Assigned ticket tried
 * @apiSuccess (200) {String} category Assigned ticket category
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 * title: "I Cant Help Myself..?",
 *   description: "I dont know if I can or not, can you know if I want to?",
 *   tried: "Asking you",
 *   category: "Ceramics"
 *  }
 * 
 * @apiError TicketAssigned Ticket already assigned.
 *
 * @apiErrorExample {json} Ticket assigned
 *  HTTP/1.1 400
 *  {
 *    "message": "Ticket has already been assigned."
 *  }
 *
 * @apiError AssignmentRestricted Ticket assignment restricted.
 *
 * @apiErrorExample {json} Ticket assignment restricted
 *  HTTP/1.1 400
 *  {
 *    "message": "Ticket assignment restricted to helpers only."
 *  }
 * 
 * @apiErrorExample {json} Assignment error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.post('/tickets/:id/assign', (req, res) => {
    const helper_id = req.user.id;
    const { id } = req.params;

    req.user.role === 'helper' ?
    Users.findAssignedTicketById(id)
        .then(ticket => {
            if (!ticket) {
                Users.assignTicket(helper_id, id)
                    .then(tickets => {
                        // Sets ticket assignment to true after assigning to helper
                        Tickets.update(id, { assigned: true })
                        res.status(200).json(tickets);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: "Failed to assign ticket." })
                    })
            } else res.status(400).json({ message: "Ticket has already been assigned." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error assigning the ticket." })
        })
    : res.status(400).json({ message: "Ticket assignment restricted to helpers only." });
});

/**
 *
 * @api {get} /users List all users
 * @apiName ListUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} users List of all users
 * @apiSuccess (200) {Number} id User ID
 * @apiSuccess (200) {String} username User username
 * @apiSuccess (200) {String} role User role
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *     "users": [
 *       {
 *         "id": 1,
 *         "username": "lambdastudent",
 *         "role": "student"
 *       },
 *       {
 *        ...
 *       }
 *     ]
 *  }
 * 
 * @apiErrorExample {json} Retrieval error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving users" })
        })
});

/**
 *
 * @api {get} /users/tickets Get user's tickets
 * @apiName GetUserTickets
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Number} ticket_id Assigned ticket ID
 * @apiSuccess (200) {String} title Assigned ticket title
 * @apiSuccess (200) {String} description Assigned ticket description
 * @apiSuccess (200) {String} tried Assigned ticket tried
 * @apiSuccess (200) {String} category Assigned ticket category
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *    title: "I Cant Help Myself..?",
 *          description: "I dont know if I can or not, can you know if I want to?",
 *          tried: "Asking you",
 *          category: "Ceramics"
 *    },
 *    {
 *      ...
 *    }
 *  ]
 * 
 * @apiError UnspecifiedRole Role not specified.
 *
 * @apiErrorExample {json} Role not specified
 *  HTTP/1.1 400
 *  {
 *    "message": "User role not specified."
 *  }
 *
 * @apiError AssignmentRestricted Ticket assignment restricted.
 *
 * @apiErrorExample {json} Ticket assignment restricted
 *  HTTP/1.1 400
 *  {
 *    "message": "Ticket assignment restricted to helpers only."
 *  }
 * 
 * @apiErrorExample {json} Retrieval error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.get('/tickets', (req, res) => {
    const user_id = req.user.id;

    if (req.user.role === 'student') {
        Users.findStudentTickets(user_id)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error retrieving tickets" })
            })
    } else if (req.user.role === 'helper') {
        Users.findAssignedTickets(user_id)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error retrieving tickets" })
            })
    } else res.status(400).json({ message: "User role not specified" });
})



router.put('/tickets/:id/resolve', (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const { solution } = req.body;

    if (solution) {
        req.user.role === 'helper' ?
    
        Users.findAssignedTicketById(id)
            .then(ticket => {
                if (ticket) {
                    if (ticket.helper_id === user_id) {
                        // Sets ticket to resolved along with the included ticket solution
                        Tickets.update(id, { solution, resolved: true })
                            .then(updatedTicket => {
                                res.status(200).json(updatedTicket)
                            });
                    } else res.status(400).json({ message: "Cannot mark ticket as resolved if it is not assigned to you." })
                } else res.status(404).json({ message: "Ticket not found (invalid assignment)" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error updating the ticket." })
            })
        : res.status(400).json({ message: "Ticket updating restricted to helpers." });
    } else res.status(400).json({ message: "Resolved tickets should include a solution." });
});


router.put('/tickets/:id/reassign', (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    req.user.role === 'helper' ?

    Users.findAssignedTicketById(id)
        .then(ticket => {
            if (ticket) {
                if (ticket.helper_id === user_id) {
                    // Sets solution to null, ticket assignment and resolved status to false, and deletes assigned ticket entry
                    Tickets.update(id, { solution: null, assigned: false, resolved: false })
                        .then(updatedTicket => {
                            Users.removeAssignedTicket(id)
                                .then(() => {
                                    res.status(200).json(updatedTicket)
                                });
                        });
                } else res.status(400)
            } else res.status(404)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
    : res.status(400)
});



router.delete('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    req.user.role === 'student' ?

    Users.findStudentTicketById(id)
        .then(ticket => {
            if (ticket) {
                // Deletes student ticket entry as well as the ticket entry in database
                if (ticket.student_id === user_id) {
                    Users.removeStudentTicket(id)
                        .then(() => {
                            Tickets.remove(id)
                                .then(() => {
                                    res.status(200)
                                })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500)
                        })
                } else res.status(400)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
    : res.status(400)
})

module.exports = router;
