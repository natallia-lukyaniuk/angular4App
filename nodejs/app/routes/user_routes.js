var ObjectID = require('mongodb').ObjectID;
const url = require('url');

module.exports = function(app, db) {
  app.post('/users', (req, res) => {
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      website: req.body.website,
      phone: req.body.phone,
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        zipcode: req.body.address.zipcode,
      }
    };
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/users', (req, res) => {
    console.log(req.query);
    const begin = +req.query.offset;
    const end = begin + +req.query.limit;
    const search = req.query.search || '';
    db.collection('users').find().toArray((err, users) => {
      const returnedUsers = users
        .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
        .slice(begin, end);
      const data = Object.assign({}, {users: returnedUsers}, {total: users.length});
      res.send(data);
    });
  });
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.put ('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      website: req.body.website,
      phone: req.body.phone,
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        zipcode: req.body.address.zipcode,
      }
    };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(result);
      } 
    });
  });
};