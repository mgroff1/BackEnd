
const db = require('../../database/db-config.js');
module.exports = {
    add,
    addTicketToStudent,
    find,
    findBy,
    findById,
    remove,
    update
}

function find() {
    return db('tickets');
}

function findBy(filter) {
    return db('tickets').where(filter);
}

async function add(ticket) {
    return await db('tickets')
    .insert(ticket, 'id')
    .then(([id]) => findById(id));
}

async function addTicketToStudent(student_id, ticket_id) {
    return await db('student-tickets')
        .insert({ student_id, ticket_id}, 'id')
        .then(() => findById(ticket_id));
}

async function remove(id) {
    return await db('tickets')
        .where({ id })
          .del();
}

async function update(id, changes) {
    return await db('tickets')
        .where({ id })
        .update(changes)
        .then(() => findById(id));
}

function findById(id) {
    return db('tickets')
      .select('id', 'title', 'description','open')
      .where({ id })
      .first();
}