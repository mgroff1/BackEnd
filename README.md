
First you must either login with a seeded user or register. You will generate a JWT token 
that will go in your header, at that point the routes open up to you. 







************************************************************************
User functions
************************************************************************
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





************************************************************************
Ticket functions
************************************************************************
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
    return await db('student_tickets')
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
      .select('id', 'title', 'description')
      .where({ id })
      .first();
}
