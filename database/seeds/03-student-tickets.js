exports.seed = function(knex) {
 
  return knex('student-tickets')
    .del()
    .then(function() {

      return knex('student-tickets').insert([
        { student_id: 1, ticket_id: 1 },
         { student_id: 1, ticket_id: 2 }
      ]);
    });
};