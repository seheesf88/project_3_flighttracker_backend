const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Report = require('../models/report');

// router.get('/myreports', async(req, res) => {
//   const allreports = await Report.find({});
//   res.json({
//     reports: allreports
//   })
// })

router.get('/:id', async(req, res) => {
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

router.delete('/delete/:id', async(req, res) => {
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedUser
    })
  }catch(err){
    res.send(err)
  }
})

router.get('/myreports/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id)
    const foundReport = await Report.findOne({'report._id' : req.params.id})
    res.json({
      status: 200,
      user: foundUser,
      report: foundReport
    })
  }catch(err){
    res.send(err)
  }
})

// router.post('/myreports', async(req, res) => {
//   try{
//     const test = req.body
//     test.userId = req.session.userId
//     console.log('req.body? =>', test);
//     const createdReport = await Report.create(test);
//     console.log('0.typeof? => ', typeof(createdReport));
//     console.log('1.createdReport =', createdReport);
//      // createdReport.userId = req.session.userId;
//      createdReport['userId'] = req.session.userId
//      console.log('2.userId?', createdReport.userId);
//      console.log('3.createdReport =', createdReport);
//      createdReport.username = req.session.username;
//      console.log('kkk', createdReport);
//      createdReport.save((err, savedReport) => {
//        console.log("????", savedReport);
//        res.json({
//          myreports: savedReport
//        })
//      })
//
//   }catch(err){
//     res.send(err)
//   }
// })


module.exports = router
