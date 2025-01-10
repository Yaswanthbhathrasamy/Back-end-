var  express = require('express')
const mongoose=require('mongoose');

const app=express();
//Middle wares 
app.use(express.json());

mongoose.connect("mongodb+srv://yaswanthvisa:.8YsRNwRRSDCsg_@cluster0.xqjkk.mongodb.net/expenses").then(() =>{
    console.log("connected to database...");
});

const expenseSchema=new mongoose.Schema({
    id: {type: String, required: true , unique:true},
    title: {type: String, required: true},
    amount: {type: Number, required: true}

});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.post("/api/expenses", (req , res) =>{
    console.log(req.body)
    //  console.log(req)
    res.end()

})

app.listen(3000,()=>{
  console.log("Server is running on http://localhost:3000");
});