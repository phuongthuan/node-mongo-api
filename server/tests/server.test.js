const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { User } = require('./../models/user');

const users = [
  {
    _id: new ObjectID(),
    email: 'thuannp@gmail.com',
    firstName: 'Nguyen',
    lastName: 'Phuong Thuan',
    address: '11F Handico Tower, Me Tri, Nam Tu Liem, Ha Noi',
    phone: '0984420195',
    division: 'Frontend Group / Design & Marketing Divison',
    password: '123123',
    role: 'member'
  },
  {
    _id: new ObjectID(),
    email: 'thuannp95@gmail.com',
    firstName: 'Nguyen',
    lastName: 'Van A',
    address: '11F Handico Tower, Me Tri, Nam Tu Liem, Ha Noi',
    phone: '0984420125',
    division: 'Frontend Group / Design & Marketing Divison',
    password: '123123',
    role: 'member'
  }
];

beforeEach((done) => {
  User.deleteMany({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});

describe('POST /users', () => {
  it('should create a new user', (done) => {

    const user = {
      email: 'thuannp2@gmail.com',
      firstName: 'Nguyen',
      lastName: 'Phuong Thuan',
      address: '11F Handico Tower, Me Tri, Nam Tu Liem, Ha Noi',
      phone: '0984420195',
      division: 'Frontend Group / Design & Marketing Divison',
      password: '123123',
    };

    request(app)
      .post('/users')
      .send(user)
      .expect(200)
      .expect(res => {
        expect(res.body.firstName).toBe(user.firstName)
      })
      .end((err, res) => {
         if (err) return done(err);

         User.find({email: user.email}).then(users => {
           expect(users.length).toBe(1);
           expect(users[0].email).toBe(user.email);
           done();
         }).catch(e => done(e));
      });
  });

  it('should create invalid user', (done) => {
    const user = {
      firstName: 'Nguyen',
      lastName: 'Phuong Thuan'
    };

    request(app)
      .post('/users')
      .send(user)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        User.find().then(users => {
          expect(users.length).toBe(2);
          done();
        }).catch(err => done(err));
      })
  });
});

describe('GET /users', () => {
  it('should fetch all users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done)
  });
});

describe('GET /users/:id', () => {
  it('should get individual user', (done) => {
    request(app)
      .get(`/users/${users[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.user.email).toBe(users[0].email)
      })
      .end(done);
  });

  it('should return 404 if user not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/users/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/users/123123')
      .expect(404)
      .end(done);
  });

});
