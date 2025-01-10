import express from 'express';
const mongoose=require('mongoose');
const app=express();
mongoose.connect("mongodb://localhost:27017/expense");
// const students=[{name:"Suriya",age:20,roll:1},
// {name:"Vijay",age:19,roll:2},
// {name:"Nirmal",age:19,roll:3},
// {name:"Kanna",age:20,roll:4}]
app.get('/api/student',(req,res)=>{
   
    res.status(200).json({name:"madhesh",age:20});//used to send the json type data
    res.end();//it will stop the api call
})//used for fetch single or multiple data
//post used to write multiple data and post the data can be show on the body
app.get('/id/:rollno', (req, res) => {
    const { rollno } = req.params; // Extract roll number from route
    const student = students.find(s => s.roll === parseInt(rollno)); 
    if (student) {
      res.status(200).json(student); // Respond with student details
    } 
});
app.listen(3000,()=>{
  console.log("Server is running on http://localhost:3000");
});