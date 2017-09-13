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
    const search = req.query.search || '';
    const searchRegExp = new RegExp(search, 'i');
    const details = {'username': searchRegExp };
    let total = null;
    const query = db.collection('users')
      .find(details)
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    query.toArray((err, users) => {
          query.count()
            .then(count => {
              total = count;
              data = Object.assign({}, {users: users}, {total: total});
              res.send(data);
            })
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