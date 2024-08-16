// remember to add Zod and react hook forms to ExpenseForm

import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./expense-tracker/constant";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import ExpenseForm from "./expense-tracker/components/ExpenseForm"
// import { nanoid } from "nanoid";


//  this interface is how we will structure our Expense data
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {

      // useStates created to hold our dummy data Expense Array and selected category from the form select and filter
      const [selectedCategory, setSelectedCategory] = useState('');
      const [data, setData] = useState<Expense[]>([]);
      const [error, setError] = useState("");
      
      // const [dummyExpensesArray, setDummyExpensesArray] = useState([
      //   {id: 1, description: 'Electricity', amount: 400, category: 'Utilities'}
      // ])

      // lets make a variable with a ternary operator   we will then use our selectedCategory as a boolean like filter through our dummyExpenseArray
      // const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e=>e.category === selectedCategory) : dummyExpensesArray;
      // now changed to account for the api data

      // per discussion with Neng, we see that visibleExpense isnt needed as its already handled with ExpenseFilter.tsx
      // then discussion with Neo, Jose and Jacob, we found we could still use this to pass in our filtered data so that our table will filter out unselected categories or keep all
      const visibleExpense = selectedCategory ? data.filter(e=>e.category === selectedCategory) : data;


      
      // Get all Expense api function
      const fetchAllExpenses = () => {
        axios
        .get(`${BASE_URL}GetAllExpenses`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if(error instanceof CanceledError){
              console.log("Request was canceled");
          } else{
            console.log("The error is " + error.message);
            setError(error);
            }
        })
        console.log(`All Data: ${data}`);
      }
      
      // delete function
      const handleDelete = (id:number) => {
        // remember that filter will return everything else that is not the id that we pass through
        // setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id !== id ))
        // this below will only show in the dom / front ent but will not pass through  to the api
        // setData(data.filter(expense => expense.id !== id ))

        axios
            .delete(`${BASE_URL}Delete/${id}`)
            .then(() => {
                setData(data.filter(expense => expense.id !== id));
                fetchAllExpenses();
            })
            .catch((error) => {
                console.log(error)
            });

      };

      // useEffect to fun an api call for the fetch all data
      useEffect(() => {
        
        fetchAllExpenses();
        
      }, [])
      

  return (
    <>
      <div className="container mainCont">
        <h1 className="text-center my-5">Expense App</h1>
        <div className="container">
          <div className="container my-4 mx-4 flexCont">
            {/* Expense Form here and notice instead of using nanoid() which is in the ExpenseForm.tsx im going to add one to the current array and use that as the ID number */}
            {/* when editing or changing this array we first have to spread the array  and then because we cannot directly edit the array we need to spread the variable that we just made and edit that which will then set to the setArray that we have in our useState */}
            <div className="container formCont col-4">
              
                <h2 className="text-center">New Expense</h2>
                {/* <div className="m-4 formStyle"><ExpenseForm onHelpSubmit={expense => setDummyExpensesArray([...dummyExpensesArray, {...expense, id: dummyExpensesArray.length + 1}])} /></div> */}
                {/* <div className="m-4 formStyle"><ExpenseForm fetchExpenses={(expense) => setData([...data, {...expense, id: data.length + 1}])} /></div> */}
                <div className="m-4 formStyle"><ExpenseForm fetchExpenses={fetchAllExpenses} /></div>
                {/* Expense Table filter option */}
                <h4 className="m-4">Selected Category</h4>
                <div className="m-4 ms-4"><ExpenseFilter onSelectedCategory={category => setSelectedCategory(category)}/></div>
              
            </div>
            <div className="container">
              <div className="col">
                <h2 className="text-center expenseMargin">Expense Table</h2>
                {/* table of data using mini challenge 10 dummy data filtered by expense filter*/}
                {/* <div className="m-5"><ExpenseList expenses={visibleExpense} onDelete={handleDelete}/></div> */}
                {/* updated to use api */}
                {/* older form of ExpenseList */}
                {/* <div className="m-5"><ExpenseList expenses={visibleExpense} onDelete={handleDelete} fetchData={fetchAllExpenses}/></div> */}
                <div className="m-5"><ExpenseList expenses={visibleExpense} onDelete={handleDelete} fetchData={fetchAllExpenses} category={selectedCategory}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App