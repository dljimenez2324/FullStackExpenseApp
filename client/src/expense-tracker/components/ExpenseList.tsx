// import axios from "axios";
// import { BASE_URL } from "../constant";
// import { useState } from "react";
import { useState } from "react";
import { Expense } from "../../App";



// here are the props that we need to use to hold the structured Expense data objects
interface ExpenseProps {
    expenses: Expense [];
    onDelete: (id:number) => void
    fetchData: () => void;
}

const ExpenseList = ({expenses, onDelete, fetchData}:ExpenseProps) => {

    // useStates here
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [updatingData, setUpdatingData] = useState<Expense | null>(null);

    // Helper functions here  start editing, stop editing and complete editing as the name updateExpense
    const startUpdate = (id:number) => {
        setUpdatingId(id);
    }

    const stopUpdate = () => {
        setUpdatingId(null);
        setUpdatingData(null);
    }

    const updateExpense = () => {

    }

    // if our array is empty we can have a separate return that gives null
    if(expenses.length == 0)
        return null;

    // if our array has some data then return this table
  return (
    <>
        <table className="table table-dark table-bordered">
            {/* gives the form of the headers for each column */}
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            {/* gives the body based upon the mapping of the expense array based upon the arrays keys*/}
            {/* notice that the expense mapping is creating a table row based upon the ID key  then in each table row created this way  the description, amount and category is created as a table data with a delete button in the last data column with the buttons onClick using a callback function that voids out the expense array at the id passed in */}
            <tbody className="dataStyle">
                {expenses.map(expense => <tr key={expense.id}>
                    <td className="dataStyle">{expense.description}</td>
                    <td className="dataStyle">$ {expense.amount.toFixed(2)}</td>
                    <td className="dataStyle">{expense.category}</td>
                    <td className="dataStyle text-center">

                        {/* need to change the edit button function !!!!!!!! */}
            
                        <button className="btn btn-outline-warning deleteButton" onClick={() => onDelete(expense.id)}>Update</button>
                        <button className="btn btn-outline-danger deleteButton" onClick={() => onDelete(expense.id)}>Delete</button>
                    </td>

                </tr>)}
                
            </tbody>
            {/* the footer contains a totaling of the expenses that are currently shown.  This uses the reduce method which ...  and is also fixed to 2 decimal places */}
            <tfoot className="footerStyle">
                <tr>
                    <td>Total Expenses</td>
                    <td>$ {expenses.reduce((acc,expense)=> expense.amount + acc,0).toFixed(2)}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </>
  )
}

export default ExpenseList