const router = require('express').Router();

const Tickets = require('./tickets-model.js');


router.get('/', (req, res) => {
    Tickets.find()
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});



router.get('/open', (req, res) => {
    Tickets.findBy({ assigned: false })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});



router.get('/closed', (req, res) => {
    Tickets.findBy({ resolved: true })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
})


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