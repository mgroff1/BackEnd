const router = require('express').Router();

const Tickets = require('./tickets-model.js');

/**
 *
 * @api {get} /tickets List all tickets
 * @apiName GetTickets
 * @apiGroup Tickets
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} tickets Ticket list
 * @apiSuccess (200) {Number} tickets.id Ticket ID
 * @apiSuccess (200) {String} tickets.title Ticket title
 * @apiSuccess (200) {String} tickets.description Ticket description
 * @apiSuccess (200) {String} tickets.tried Ticket tried
 * @apiSuccess (200) {String} tickets.category Ticket category
 * @apiSuccess (200) {String} tickets.solution Ticket solution
 * @apiSuccess (200) {Boolean} tickets.assigned Is ticket assigned? Defaults to false
 * @apiSuccess (200) {Boolean} tickets.resolved Is ticket resolved? Defaults to false
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "title": "How do I into Node?",
 *      "description": "No seriously I don't get it.",
 *      "tried": "Many things."
 *      "category": "Node",
 *      "solution": null,
 *      "assigned": false,
 *      "resolved": false
 *    },
 *    {
 *      . . .
 *    }
 *  ]
 *
 * @apiErrorExample {json} List error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.get('/', (req, res) => {
    Tickets.find()
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

/**
 *
 * @api {get} /tickets/open List open tickets
 * @apiName GetOpenTickets
 * @apiGroup Tickets
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} tickets Ticket list
 * @apiSuccess (200) {Number} tickets.id Ticket ID
 * @apiSuccess (200) {String} tickets.title Ticket title
 * @apiSuccess (200) {String} tickets.description Ticket description
 * @apiSuccess (200) {String} tickets.tried Ticket tried
 * @apiSuccess (200) {String} tickets.category Ticket category
 * @apiSuccess (200) {String} tickets.solution Ticket solution
 * @apiSuccess (200) {Boolean} tickets.assigned Is ticket assigned? Returns ticket only if false
 * @apiSuccess (200) {Boolean} tickets.resolved Is ticket resolved? Defaults to false
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "title": "How do I into Node?",
 *      "description": "No seriously I don't get it.",
 *      "tried": "Many things."
 *      "category": "Node",
 *      "solution": null,
 *      "assigned": false,
 *      "resolved": false
 *    },
 *    {
 *      . . .
 *    }
 *  ]
 *
 * @apiErrorExample {json} List error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.get('/open', (req, res) => {
    Tickets.findBy({ assigned: false })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

/**
 *
 * @api {get} /tickets/closed List closed tickets
 * @apiName GetClosedTickets
 * @apiGroup Tickets
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} tickets Ticket list
 * @apiSuccess (200) {Number} tickets.id Ticket ID
 * @apiSuccess (200) {String} tickets.title Ticket title
 * @apiSuccess (200) {String} tickets.description Ticket description
 * @apiSuccess (200) {String} tickets.tried Ticket tried
 * @apiSuccess (200) {String} tickets.category Ticket category
 * @apiSuccess (200) {String} tickets.solution Ticket solution
 * @apiSuccess (200) {Boolean} tickets.assigned Is ticket assigned? Defaults to false
 * @apiSuccess (200) {Boolean} tickets.resolved Is ticket resolved? Returns ticket only if true
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "title": "How do I into Node?",
 *      "description": "No seriously I don't get it.",
 *      "tried": "Many things."
 *      "solution": null,
 *      "assigned": true,
 *      "resolved": true
 *    },
 *    {
 *      . . .
 *    }
 *  ]
 *
 * @apiErrorExample {json} List error
 *  HTTP/1.1 500 Internal Server Error
 *
 */

router.get('/closed', (req, res) => {
    Tickets.findBy({ resolved: true })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

/**
 *
 * @api {post} /tickets Add new ticket
 * @apiName AddNewTicket
 * @apiGroup Tickets
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title Ticket title
 * @apiParam {String} description Ticket description
 * @apiParam {String} tried Ticket tried
 * @apiParam {String} category Ticket category
 *
 * @apiSuccess (200) {Number} id Created ticket ID
 * @apiSuccess (200) {String} title Created ticket title
 * @apiSuccess (200) {String} description Created ticket description
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "title": "I need professional help!",
 *    "description": "Help from a professional",
 *    "tried": "Seeking professional help",
 *    "category": "Professional"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "title": "I need professional help!",
 *    "description": "Help from a professional"
 *  }
 * 
 * @apiError MissingTicketParameters Missing ticket parameters.
 *
 * @apiErrorExample {json} Missing ticket parameters.
 *  HTTP/1.1 400
 *  {
 *    "message": "Missing ticket parameters."
 *  }
 *
 * @apiError ErrorAddingTicket Error adding the ticket.
 *
 * @apiErrorExample {json} Error adding the ticket
 *  HTTP/1.1 500
 *  {
 *    "message": "Error adding the ticket."
 *  }
 *
 * @apiError AddingTicketRestricted Adding tickets restricted to students.
 *
 * @apiErrorExample {json} Adding tickets restricted
 *  HTTP/1.1 400
 *  {
 *    "message": "Adding tickets restricted to students."
 *  }
 *
 */

router.post('/', (req, res) => {
    const { title, description, tried, category } = req.body;

    if (req.user.role === 'student') {
        if (!title || !description || !tried || !category) {
            res.status(400).json({ message: "Missing ticket parameters." });
        } else Tickets.add(req.body)
            .then(ticket => {
                Tickets.addTicketToStudent(req.user.id, ticket.id)
                    .then(ticket => {
                        res.status(201).json(ticket);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error adding the ticket." })
            })
    } else res.status(400).json({ message: "Adding tickets restricted to students." })
});

module.exports = router;