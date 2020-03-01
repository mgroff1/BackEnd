const db = require('../../database/db-config.js');

module.exports = {
  add,
  assignTicket,
  find,
  findAssignedTicketById,
  findAssignedTickets,
  findBy,
  findById,
  findStudentTicketById,
  findStudentTickets,
  removeAssignedTicket,
  removeStudentTicket
};

async function assignTicket(staff_id, ticket_id) {
  return await db('assigned_tickets')
    .insert({ staff_id, ticket_id }, 'id')
    .then(() => findAssignedTickets(staff_id));
}

function find() {
  return db('users').select('id', 'username', 'role');
}

async function findAssignedTicketById(ticket_id) {
  return await db('assigned_tickets')
    .select('id', 'staff_id', 'ticket_id')
    .where({ ticket_id })
    .first();
}

async function findAssignedTickets(id) {
  return await db('assigned_tickets as at')
    .where('staff_id', id)
    .join('tickets as t', 'at.ticket_id', 't.id')
    .select(
      'at.ticket_id',
      't.title',
      't.description',
      't.tried',
      't.category',
      't.solution'
    );
}

function findBy(filter) {
  return db('users').where(filter);
}

async function findStudentTickets(id) {
  return await db('student_tickets as st')
    .where('student_id', id)
    .join('tickets as t', 'st.ticket_id', 't.id')
    .select(
      'st.ticket_id',
      't.title',
      't.description',
      't.tried',
      't.category',
      't.solution'
    );
}

async function add(user) {
  return await db('users')
    .insert(user, 'id')
    .then(([id]) => findById(id));
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'role')
    .where({ id })
    .first();
}

async function findStudentTicketById(ticket_id) {
  return await db('student_tickets')
    .select('id', 'student_id', 'ticket_id')
    .where({ ticket_id })
    .first();
}

async function removeAssignedTicket(ticket_id) {
  return await db('assigned_tickets')
    .where({ ticket_id })
    .del();
}

async function removeStudentTicket(ticket_id) {
  return await db('student_tickets')
    .where({ ticket_id })
    .del();
}