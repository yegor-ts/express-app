const axios = require('axios');

describe('e2e user routes testing', () => {
   test('it should return  proper user by id', async () => {
       const users = await axios.get('http://localhost:3000/user');
       const resp = await axios.get(`http://localhost:3000/user/${users.data[0].id}`);
       expect(resp.data).toHaveProperty('id', users.data[0].id);
   });

    test('should return error message with incorrect user id', async () => {
        const resp = await axios.get('http://localhost:3000/user/ewf9v9ckou2n7t9');
        expect(resp.data.error).toBeUndefined();
    });

    test('should return array of users', async () => {
        const resp = await axios.get('http://localhost:3000/user');
        expect(resp.data).toBeInstanceOf(Array);
    });

    test('should create new user', async () => {
        const resp = await axios.post('http://localhost:3000/user', {
            name: 'John',
            email: 'doe@test.com',
            password: '12345'
        }).catch((e) => console.log(e));
        expect(resp.data).toHaveProperty('name');
        expect(resp.data).toHaveProperty('email', 'doe@test.com');
    });

    test('should return error of incorrect email while creating new user', async () => {
        try {
            await axios.post('http://localhost:3000/user', { name: 'john', email: 'doe_email', password: '12345' });
        } catch (e) {
            expect(e.response.data).toBe('Error validating request body. \"email\" must be a valid email.');
        }
    });

    test('should delete user by id', async () => {
        const users = await axios.get('http://localhost:3000/user');
        const resp = await axios.delete(`http://localhost:3000/user/${users.data.reverse()[0].id}`);
        expect(resp.data).toBe('User was deleted');
    });

    test('should update user by id', async () => {
        const users = await axios.get('http://localhost:3000/user');
        const resp = await axios.patch(`http://localhost:3000/user/${users.data[0].id}`, {
            name: 'Random Name',
            email: 'random@email.com',
            password: 'random'
        });
        expect(resp.data).toHaveProperty('id', users.data[0].id);
        expect(resp.data).toHaveProperty('name', 'Random Name');
        expect(resp.data).toHaveProperty('email', 'random@email.com');
    });

    test('should return error message while updating user by incorrect user id', async () => {
        const resp = await axios.patch('http://localhost:3000/user/ewf9v9cckou2n7', {
            name: 'Random Name',
            email: 'random@email.com',
            password: 'random'
        });
        expect(resp.data).toBe('No Content');
    });
});

describe('e2e post routes testing', () => {
    test('should return correct post by id', async () => {
        const posts = await axios.get('http://localhost:3000/post');
        const resp = await axios.get(`http://localhost:3000/post/${posts.data[0].id}`);
        expect(resp.data).toHaveProperty('id', posts.data[0].id);
    });

    test('should return message with incorrect post id', async () => {
        const resp = await axios.get('http://localhost:3000/post/ewf9v9ckou2n7t9');
        expect(resp.data).toBe('No such post');
    });

    test('should return list of posts', async () => {
        const resp = await axios.get('http://localhost:3000/post');
        expect(resp.data).toBeInstanceOf(Array);
    });

    test('should create new post', async () => {
        const users = await axios.get('http://localhost:3000/user');
        const resp = await axios.post('http://localhost:3000/post', { text: 'Random text', authorId: users.data[0].id });
        expect(resp.data).toHaveProperty('id');
        expect(resp.data).toHaveProperty('authorId', users.data[0].id);
    });

    test('should return error of requiring creator field while creating new post', async () => {
        try {
            await axios.post('http://localhost:3000/post', { text: 'text' });
        } catch (e) {
            expect(e.response.data).toBe('Error validating request body. \"authorId\" is required.');
        }
    });

    test('should delete post by id', async () => {
        const posts = await axios.get('http://localhost:3000/post');
        const resp = await axios.delete(`http://localhost:3000/post/${ posts.data[0].id }`)
        expect(resp.data).toBe('Post was deleted');
    });

    test('should update post by id', async () => {
        const posts = await axios.get('http://localhost:3000/post');
        const resp = await axios.patch(`http://localhost:3000/post/${posts.data[0].id}`,  {
            text: 'New random text'
        });
        expect(resp.data).toHaveProperty('text', 'New random text');
    });

    test('should return error message while updating post by incorrect id', async () => {
        const resp = await axios.patch('http://localhost:3000/post/ewf9v9cckou2n7', { text: 'New random text' });
        expect(resp.data).toBe('No Content');
    });
});

describe('e2e follower routes testing', () => {
    test('should create follow', async () => {
        const users = await axios.get('http://localhost:3000/user');
        users.data = users.data.reverse();
        const resp = await axios.post('http://localhost:3000/follow',
            { followerId: users.data[0].id, targetId: users.data[1].id });
        expect(resp.data).toHaveProperty('followerId');
        expect(resp.data).toHaveProperty('targetId');
    });

    test('should find all follows', async () => {
        const resp = await axios.get('http://localhost:3000/follow')
        expect(resp.data).toBeInstanceOf(Array)
    })

    test('should accept follow (update status)', async () => {
        const follows = await axios.get('http://localhost:3000/follow');
        const resp = await axios.patch('http://localhost:3000/follow/accept',
            { followerId: follows.data[0].followerId, targetId: follows.data[0].targetId }
        );
        expect(resp.data.status).toBe('Accepted');
    });

    test('should decline follow (update status)', async () => {
        const follows = await axios.get('http://localhost:3000/follow');
        const resp = await axios.patch('http://localhost:3000/follow/decline',
            { followerId: follows.data[0].followerId, targetId: follows.data[0].targetId }
        );
        expect(resp.data.status).toBe('Declined');
    });
});

describe('e2e auth routes testing', () => {
    test('should return expired token message while auth with access', async () => {
        const resp = await axios.get('http://localhost:3000/auth?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1YjI0ZTVjLTg4Y2ItNDA0NS1iZmFmLTNkYzZlM2MzZDI1MCIsImlhdCI6MTYyMjU1ODg3N30.fnZWz5N6zWTobjJjACstVg0KJMxxpG3X2PI2ax4q6s4');
        expect(resp.data).toBe('Access token has expired');
    });

    test('should return user info while logging', async () => {
        const resp = await axios.post(`http://localhost:3000/auth/login`, { email: 'yegor@gmail.com', password: '12345' })
        expect(resp.data).toHaveProperty('id');
        expect(resp.data).toHaveProperty('name');
        expect(resp.data).toHaveProperty('password');
    });

    test('should return error message with invalid refresh_token', async () => {
        const resp = await axios.post(`http://localhost:3000/auth?refresh_token=123123`);
        expect(resp.data).toBe('jwt malformed');
    })
    test('should return create new user and return user info', async () => {
        const resp = await axios.post(`http://localhost:3000/auth/signup`, {
            name: 'Test User',
            email: 'testuser@gmail.com',
            password: '12345'
        });
        expect(resp.data).toHaveProperty('message', 'Signup successful');
        expect(resp.data.user).toHaveProperty('name');
        expect(resp.data.user).toHaveProperty('email');
        expect(resp.data.user).toHaveProperty('password');
    });
});