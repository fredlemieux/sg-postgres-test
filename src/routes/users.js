const express = require('express');
const UserRepo = require('../repository/user-repo')

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await UserRepo.find();

  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  const user = await UserRepo.findById(req.params.id);


  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/users', async (req, res) => {
  const { username, bio } = req.body;

  const dbRes = await UserRepo.insert(username, bio)

  if (dbRes) {
    res.send("Thanks");
  } else {
    res.sendStatus(404);
  }
});

router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);

  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404);
  }

});

router.delete('/users/:id', async (req, res) => {
  const user = await UserRepo.delete(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
})

module.exports = router;

