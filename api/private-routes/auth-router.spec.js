
const db = require('../../database/db-config.js');

beforeEach(async () => {
    await db('users').truncate()
});

describe('auth-router.js', () => {
    describe('POST /register', () => {
        it('should insert a new user', async () => {
            const initial = await db('users');
            await Users.add({ username: 'Andre', password: '123', role: 'student' });
            const users = await db('users');
            expect(users).toHaveLength(initial.length + 1);
        });
        it('should insert the correct username', async () => {
            const user = await Users.add({ username: 'April', password: '123', role: 'staff' });
            expect(user.username).toBe('jimmy');
        });
    });
    describe('POST /login', () => {
        it('should find a user by username', async ()=>{
            await Users.add({ username: 'Andre', password: '123', role: 'student' });
            await Users.findBy({ username: 'Andre' }).first().then(user => {
                expect(user).toEqual({ id: 1, username: 'Andre', password: '123', role: 'student' })
            })
        })
    });
});