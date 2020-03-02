const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');



router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (role === 'staff' || role === 'student') {
    try {
      if (username && password && role) {
        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
      
        await Users.add(user)
          .then(saved => {
            const token = generateToken(saved);
            res.status(201).json({
              id: saved.id,
              username: saved.username,
              role: saved.role,
              token
            })
          })
      } else res.status(400).json({ message: "Missing user parameters" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Wiping database: Press any button or click your mouse to proceed', error });
        alert('Wiping database: Press any button or click your mouse to proceed');
    }
  } else res.status(400).json({ message: "Slow your roll bro, You need to provide a role!" });
});



router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            id: user.id,
            username: user.username,
            role: user.role,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid user credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.post('/api/login', (req, res) => {
      // Mock user
      const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
      }
    })



function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role
    };
    const options = {
      expiresIn: '3h',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
