const router = require('express').Router();

const Tickets = require('../tickets/tickets-model.js');
const Users = require('./users-model.js');


router.post('/tickets/:id/assign', (req, res) => {
    const helper_id = req.user.id;
    const { id } = req.params;

    req.user.role === 'helper' ?
    Users.findAssignedTicketById(id)
        .then(ticket => {
            if (!ticket) {
                Users.assignTicket(helper_id, id)
                    .then(tickets => {
                        Tickets.update(id, { assigned: true })
                        res.status(200).json(tickets);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500)
                    })
            } else res.status(400)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
    : res.status(400)
});



router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
});



router.get('/tickets', (req, res) => {
    const user_id = req.user.id;

    if (req.user.role === 'student') {
        Users.findStudentTickets(user_id)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500)
            })
    } else if (req.user.role === 'helper') {
        Users.findAssignedTickets(user_id)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500)
            })
    } else res.status(400)
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
                        Tickets.update(id, { solution, resolved: true })
                            .then(updatedTicket => {
                                res.status(200).json(updatedTicket)
                            });
                    } else res.status(400)
                } else res.status(404)
            })
            .catch(err => {
                console.log(err);
                res.status(500)
            })
        : res.status(400)
    } else res.status(400)
});


router.put('/tickets/:id/reassign', (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    req.user.role === 'helper' ?

    Users.findAssignedTicketById(id)
        .then(ticket => {
            if (ticket) {
                if (ticket.helper_id === user_id) {
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
