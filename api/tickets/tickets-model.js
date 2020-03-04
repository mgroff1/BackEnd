////
/// @page tickets/tickets-model
/// 
/// 
////
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


/// @returns {any} - 
function find() {
    return db('tickets');
}

/// @param {any} filter - 
/// @returns {any} - 
function findBy(filter) {
    return db('tickets').where(filter);
}

/// @param {any} ticket - 
/// @returns {any} - 
async function add(ticket) {
    return await db('tickets')
    .insert(ticket, 'id')
    .then(([id]) => findById(id));
}
//
/// @param {any} student_id - 
/// @param {any} ticket_id - 
/// @returns {any} - 
async function addTicketToStudent(student_id, ticket_id) {
    return await db('student_tickets')
        .insert({ student_id, ticket_id}, 'id')
        .then(() => findById(ticket_id));
}

/// @param {any} id - 
/// @returns {any} - 
async function remove(id) {
    return await db('tickets')
        .where({ id })
        .del();
}

/// @param {any} id - 
/// @param {any} changes - 
/// @returns {any} - 
async function update(id, changes) {
    return await db('tickets')
        .where({ id })
        .update(changes)
        .then(() => findById(id));
}

/// @param {any} id - 
/// @returns {any} - 
function findById(id) {
    return db('tickets')
      .select('id', 'title', 'description')
      .where({ id })
      .first();
}