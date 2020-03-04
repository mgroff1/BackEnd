const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'student',
          password: bcrypt.hashSync('456', 10),
          role: 'student'
        },
        {
          username: 'staff',
          password: bcrypt.hashSync('123', 10),
          role: 'staff'
        }
      ]);
    });
};
