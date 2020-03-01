exports.seed = function(knex) {
 
  return knex('student_tickets')
    .del()
    .then(function() {

      return knex('student_tickets').insert([
        { student_id: 1, ticket_id: 1 },
        { student_id: 1, ticket_id: 2 }
      ]);
    });
};