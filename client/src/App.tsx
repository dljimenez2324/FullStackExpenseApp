// remember to add Zod and react hook forms to ExpenseForm

import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import ExpenseForm from "./expense-tracker/components/ExpenseForm"
// import { nanoid } from "nanoid";

const App = () => {

      // useStates created to hold our dummy data Expense Array and selected category from the form select and filter
      const [selectedCategory, setSelectedCategory] = useState('');
      
      const [dummyExpensesArray, setDummyExpensesArray] = useState([
        {id: 1, description: 'Electricity', amount: 400, category: 'Utilities'}
      ])

      // lets make a variable with a ternary operator   we will then use our selectedCategory as a boolean like filter through our dummyExpenseArray
      const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e=>e.category === selectedCategory) : dummyExpensesArray;


      // delete function
      const handleDelete = (id:number) => {
        // remember that filter will return everything else that is not the id that we pass through
        setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id !== id ))
      }




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
                <div className="m-4 formStyle"><ExpenseForm onHelpSubmit={expense => setDummyExpensesArray([...dummyExpensesArray, {...expense, id: dummyExpensesArray.length + 1}])} /></div>
                {/* Expense Table filter option */}
                <h4 className="m-4">Selected Category</h4>
                <div className="m-4 ms-4"><ExpenseFilter onSelectedCategory={category => setSelectedCategory(category)}/></div>
              
            </div>
            <div className="container">
              <div className="col">
                <h2 className="text-center expenseMargin">Expense Table</h2>
                {/* table of data */}
                <div className="m-5"><ExpenseList expenses={visibleExpense} onDelete={handleDelete}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App