
import { useState } from "react";
import { Expense } from "../../App";
import axios from "axios";
import { BASE_URL } from "../constant";

// here are the props that we need to use to hold the structured Expense data objects
interface ExpenseProps {
    expenses: Expense[];
    onDelete: (id: number) => void;
    fetchData: () => void;
    category: string;
}

const ExpenseList = ({
    category,
    expenses,
    onDelete,
    fetchData,
}: ExpenseProps) => {

    // useStates here
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [updatingData, setUpdatingData] = useState<Expense>({
        id: 0,
        description: "",
        amount: 0,
        category: ""
    });
    const [savedData, setSavedData] = useState<Expense[]>([]);

    // Helper functions here  start editing, stop editing and complete editing as the name updateExpense
    const startUpdate = (id: number) => {
        setUpdatingId(id);
        const foundExpense = expenses.find((exp) => exp.id === id);

        if (foundExpense) {
            setUpdatingData({ ...foundExpense });
        }
    };

    const stopUpdate = () => {
        setUpdatingId(null);
        setUpdatingData({
            id: 0,
            description: "",
            amount: 0,
            category: ""
        });
    };

    const saveExpense = (id: number) => {
        if (updatingData) {
            axios
                .put(`${BASE_URL}Edit/${id}`, updatingData)
                .then(() => {
                    fetchData();
                    //// maybe try if need the setSavedData useState
                    // setSavedData(
                    //     expenses.map((exp) => (exp.id === id ? updatingData : exp))
                    // );

                })
                .catch((error) => console.log(error.message));
     
        }
        stopUpdate();

        
    };

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
                    {category === ""
                        ? expenses.map((expense) => (
                            <tr key={expense.id}>

                                {/* input field for description or current description shown from api */}
                                <td className="dataStyle">
                                    {updatingId === expense.id ? (
                                        <input
                                            type="text"
                                            className="col-11"
                                            value={updatingData?.description || ""}
                                            onChange={(e) =>
                                                setUpdatingData({
                                                    ...updatingData,
                                                    description: e.target.value,
                                                })
                                            }

                                        />
                                    ) : (
                                        expense.description
                                    )}
                                </td>

                                {/* input field for amount or current amount shown from api */}
                                <td className="dataStyle">$
                                    {updatingId === expense.id ? (
                                        <input
                                            type="number"
                                            className="col-11"
                                            value={updatingData?.amount || 0}
                                            onChange={(e) =>
                                                setUpdatingData({
                                                    ...updatingData,
                                                    amount: Number(e.target.value),
                                                })
                                            }

                                        />
                                    ) : (
                                        expense.amount.toFixed(2)
                                    )}
                                </td>
                                
                                {/* Input field for category or current category shown from api */}
                                {/* <td className="dataStyle">{expense.category}</td> */}
                                <td className="dataStyle">
                                {updatingId === expense.id ? (
                                        <input
                                            type="text"
                                            className="col-11"
                                            value={updatingData?.category || ""}
                                            onChange={(e) =>
                                                setUpdatingData({
                                                    ...updatingData,
                                                    category: e.target.value,
                                                })
                                            }

                                        />
                                    ) : (
                                        expense.category
                                    )}
                                    
                                </td>
                                
                                {/* Update and Delete buttons will change to Add and Cancel buttons when the updatingid is equal to the selected expense.id */}
                                <td className="dataStyle text-center">
                                    {updatingId === expense.id ? (
                                        <>
                                            <button
                                                className="btn btn-outline-warning deleteButton"
                                                onClick={() => saveExpense(expense.id)}
                                            >
                                                ...Add...
                                            </button>
                                            <button
                                                className="btn btn-outline-danger deleteButton"
                                                onClick={stopUpdate}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-outline-warning deleteButton"
                                                onClick={() => startUpdate(expense.id)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-outline-danger deleteButton"

                                                onClick={() => onDelete(expense.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )
                                    }
                                </td>
                            </tr>
                        ))
                        : expenses
                            .filter((expense) => expense.category === category)
                            .map((expense) => (
                                <tr key={expense.id}>
                                    <td className="dataStyle">{expense.description}</td>
                                    <td className="dataStyle">$ {expense.amount.toFixed(2)}</td>
                                    <td className="dataStyle">{expense.category}</td>
                                    <td className="dataStyle text-center">

                                        <button
                                            className="btn btn-outline-warning deleteButton"
                                            onClick={() => startUpdate(expense.id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-outline-danger deleteButton"
                                            onClick={() => onDelete(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                </tbody>
                {/* the footer contains a totaling of the expenses that are currently shown.  This uses the reduce method which ...  and is also fixed to 2 decimal places */}
                <tfoot className="footerStyle">
                    <tr>
                        <td>Total Expenses</td>
                        <td>
                            ${" "}
                            {expenses
                                .reduce((acc, expense) => expense.amount + acc, 0)
                                .toFixed(2)}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseList;
