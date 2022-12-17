const express = require("express");
const jobModel = require("../Model/job.model");
const jobController = express.Router();



jobController.post("/addjob", async (req, res) => {
  const { companyname,city,location,role,level,position,language,contract , userId } = req.body;
 const postedat=new Date()
  const new_job = new jobModel({
    companyname,
    city,
    location,
    role,
    level,
    position,
    language,
    contract,
    postedat,
    userId,
  });
  await new_job.save();
  res.send({ message: "job Created Successfully", job: new_job });
});

jobController.get("/", async (req, res) => {
  const q = req.query.q;
  const page = req.query.page || 1;
  const { userId } = req.body;
  const sortBy = req.query.sortBy;
  const filter = req.query.filter;
  const limit=10
  const skip = (+page - 1) * limit;
  
  // Search
  if (q) {
  const job = await jobModel.find({ language: q }).skip(skip).limit(limit);
  return res.send(job);
  }
  
  // sortBy
  if (sortBy == "asc") {
  // const { userId } = req.body;
  const job = await jobModel.find({ userId }).sort({ age: 1 }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if (sortBy == "desc") {
  const job = await jobModel.find({ userId }).sort({
  age: -1,
  }).skip(skip).limit(limit);
  return res.send(job);
  }
  
  if(filter=="Frontend"){
  const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if(filter=="Backend"){
  const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if(filter=="FullStack"){
    const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
    return res.send(job);
    }
  
  const job = await jobModel.find({ userId }).skip(skip).limit(limit);;
  return res.send(job);
  });

module.exports = jobController;