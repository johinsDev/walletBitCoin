import Client from '../models/client';

const store = (req, res) => {
  Client.create({}, {$inc: { client_id: 1} }, (err, client) => {
      res.send(client);
  })
}


module.exports = {
  store
}