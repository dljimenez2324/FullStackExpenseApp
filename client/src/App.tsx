

import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./expense-tracker/constant";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";

//  this interface is how we will structure our Expense data
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  // useStates created to hold our dummy data Expense Array and selected category from the form select and filter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState<Expense[]>([]);
  const [error, setError] = useState("");

  // per discussion with Neng, we see that visibleExpense isnt needed as its already handled with ExpenseFilter.tsx
  // then discussion with Neo, Jose and Jacob, we found we could still use this to pass in our filtered data so that our table will filter out unselected categories or keep all
  const visibleExpense = selectedCategory
    ? data.filter((e) => e.category === selectedCategory)
    : data;

  // Get all Expense api function
  const fetchAllExpenses = () => {
    axios
      .get(`${BASE_URL}GetAllExpenses`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.log("Request was canceled");
        } else {
          console.log("The error is " + error.message);
          setError(error);
        }
      });
    console.log(`All Data: ${data}`);
  };

  // delete function
  const handleDelete = (id: number) => {
    axios
      .delete(`${BASE_URL}Delete/${id}`)
      .then(() => {
        setData(data.filter((expense) => expense.id !== id));
        fetchAllExpenses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect to fun an api call for the fetch all data
  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <>
      <div className="container mainCont">
        <h1 className="text-center my-5">Expense App</h1>
        <div className="container">
          <div className="container my-4 mx-4 flexCont">
            <div className="container formCont col-4">
              <h2 className="text-center">New Expense</h2>
              <div className="m-4 formStyle">
                <ExpenseForm fetchExpenses={fetchAllExpenses} />
              </div>
              <h4 className="m-4">Selected Category</h4>
              <div className="m-4 ms-4">
                <ExpenseFilter
                  onSelectedCategory={(category) =>
                    setSelectedCategory(category)
                  }
                />
              </div>
            </div>
            <div className="container">
              <div className="col">
                <h2 className="text-center expenseMargin">Expense Table</h2>
                <div className="m-4">
                  <ExpenseList
                    expenses={visibleExpense}
                    onDelete={handleDelete}
                    fetchData={fetchAllExpenses}
                    category={selectedCategory}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
