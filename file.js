const express = require('express')
const mongoose = require('mongoose');
const {v4: uuidv4 } = require("uuid");


const app = express();
// middle man from req to res 
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/expenses").then(() => {
    console.log("connected to database...");
});

const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true }

});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req,res)=>{
    try{
      const expenses = await Expenses.find();
      res.status(200).json(expenses)}
      catch(error){
        res.status(500).json({ messagee: "Failed to fetch expenses"});
      }
    });
    
    app.get("/api/expenses/:id", async ( req, res) =>{
        try{
            const {id} = req.params
            const expense = await Expenses.findOne({id})
            if(!expense) {
                return res.status(404).json({message: "Expense not found "}); 
            }
            console.log(expense);
            res.status(200).json(expense);
        }
        catch(error) {
            res.status(500).json({ message: "Error in fetching expenses"});
        }
    });

app.post("/api/expenses", async (req , res) =>{
    const {title,amount} = req.body;
    // console.log(title);

    const newExpense =new Expenses({
       id : uuidv4(),
       // both are same (title: title,) == (title,)
       title: title,
       amount: amount,
        
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense)



});

app.put("/api/expenses/:id", async (req , res) => {
    const { id } = req.params;
    const { title ,amount } = req.body;
    try {
        const updateExpense = await Expenses.findOneAndUpdate(
            {id} , 
            { title , amount},
            {new:true}
        )
        if(!updateExpense) {
            return res.status(404).json({ message: "Expense not found"});
        }

        res.status(200).json({message: "Updated Successfully"});
    }
    catch(error) {
        res.status(500).json({message: "Error in updating"})
    }
});

app.delete("/api/expenses/:id" , async (req, res) => {
    const { id } = req.params;
    try{
        const deletedExpense = await Expenses.findOneAndDelete({ id });
        if(!deletedExpense){
            return res.status(404).json({message: "Expense not found "})
        }
        res.status(200).json({message: "Expense deleted"});
    }
    catch (error) {
        res.status(500).json({message: "Error in deleting expense"});
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});