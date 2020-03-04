exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets')
    .del()
    .then(function() {
       // Inserts seed entries
       return knex('tickets').insert([
        {
          title: "What In the NPM Is Going On Around Here?",
          description: "I feel like jello",
          category: "help"
        },
        {
          title: "I Cant Help Myself..?",
          description: "I dont know if I can or not, can you know if I want to?",
          category: "Ceramics"
        }
      ]);
    });
};