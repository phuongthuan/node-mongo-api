const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {User} = require('./../models/user');

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

/*===========================================
 POST REQUEST TEST
 ===========================================*/
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

        User.find({email: user.email})
          .then(users => {
            expect(users.length).toBe(1);
            expect(users[0].email).toBe(user.email);
            done();
          })
          .catch(err => done(err));
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

        User.find()
          .then(users => {
            expect(users.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      })
  });
});

/*===========================================
 GET REQUEST TEST
 ===========================================*/
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


/*===========================================
 DELETE REQUEST TEST
 ===========================================*/
describe('DELETE /users/:id', () => {
  it('should delete a user', (done) => {

    const hexId = users[0]._id.toHexString();

    request(app)
      .delete(`/users/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.user._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) return done(err);

        User.find()
          .then(users => {
            expect(users.length).toBe(1);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 404 if user not found', (done) => {
    request(app)
      .delete('/users/5b98e13b430d2d30bc496fe2')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        User.find()
          .then(users => {
            expect(users.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      })
  });

  it('should return 404 if object ID is invalid', (done) => {
    request(app)
      .delete('/users/123123')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        User.find()
          .then(users => {
            expect(users.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      })
  });
});

describe('PATCH /users/:id', () => {
  it('should update a user', (done) => {

    const hexId = users[0]._id.toHexString();
    const firstName = 'Carl';

    request(app)
      .patch(`/users/${hexId}`)
      .send({firstName})
      .expect(200)
      .expect(res => {
        expect(res.body.user.firstName).toBe(firstName)
      })
      .end(done);
  });
});
