const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', async(req, res) => {
  const AllUsers = await User.find({});
  res.json({
    user:AllUsers,
  })
})

router.post('/', async(req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const UserDbEntry = {};
        UserDbEntry.username  = username;
        UserDbEntry.email     = email;
        UserDbEntry.password  = hashedPassword;

  try {
    const user = await User.create(UserDbEntry);

    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userId = user._id;

    res.json({
      status: 200,
      data: 'register successful',
      userId: user._id,
    })
  }catch(err){
    res.send(err)
  }
})


router.post('/login', async(req, res) => {
  try{
    // const foundUser = await User.findOne({username: req.body.username})
    const foundUser = await User.findOne({email: req.body.email})
    if(foundUser){
      const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;
        req.session.userId = foundUser._id
        res.json({
          status:200,
          data: 'login successful',
          userId: foundUser._id,
          username: foundUser.username
        })
      }else{
        req.session.message = 'username or password is not correct'
        res.status(401).json({
          status: 401,
          data: 'login unsuccessful'
        })
      }
    }else{
      req.session.message = 'username or password is incorrect';
      res.json({
        status: 401,
        data: 'login unsuccessful',
      })
    }
  }catch(err){
    res.send(err)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    }else{
      res.json({
        status: 200,
        data: 'logout successful'
      })
    }
  })
})


router.get('/info/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id)
    res.json({
      status: 200,
      data: foundUser
    })
  }catch(err){
    res.send(err)
  }
})

router.put('/info/:id', async(req, res) => {
  try{
    const modifyProfile = {};
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    modifyProfile.password = hashedPassword;
    modifyProfile.username = req.body.username;
    modifyProfile.email    = req.body.email;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new: true})
    res.json({
      status: 200,
      data: 'user is updated',
      updatedUser: updatedUser
    })
  }catch(err){
    res.json(err)
  }
})

module.exports = router
