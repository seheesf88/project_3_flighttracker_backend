const express = require('express');
const router  = express.Router();
const Report  = require('../models/report');


//report list
router.get('/', async(req, res) => {
  try{
    const allReports = await Report.find();
    res.json({
      status: 200,
      data: allReports
    })
  }catch(err){
      res.send(err)
  }
});

//report show
router.get('/:id', async(req, res) => {
  console.log(req.body)
  try{
    const foundReport = await Report.findById(req.params.id)
    res.json({
      status: 200,
      data: foundReport
    })
  }catch(err){
    res.send(err)
  }
});

//report create
router.post('/', async(req, res) => {
  // console.log(`Report Create: ${req.body}`)

  try{
    const createdReport = await Report.create(req.body);
    // console.log(`Created Report: ${createdReport}`);
    res.json({
      status:200,
      data: createdReport,
      reportCode: report._id
    })
  }catch(err){
    res.send(err)
  }
});


//report edit
router.put('/:id', async(req, res) => {
  try{
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedReport
    })
  }catch(err){
    res.send(err)
  }
});


//report delete
router.delete('/:id', async(req, res) => {
  try{
    const deletedReport = await Report.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedReport
    })
  }catch(err){
    res.send(err)
  }
});


module.exports = router
