import categories from "../categories";
import { Expense } from "../../App";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { BASE_URL } from "../constant";

// in order to use zod we need to make our schema
const schema = z
  .object({
    // note that id was   id: z.number(),    before change to nanoid
    id: z.number().default(0),
    // id: z.number(),
    description: z.string().min(3, { message: "Need at least 3 letters" }),
    amount: z.number(),
    category: z.string(),
  })
  .refine((data) => data.category !== "Select a Category", {
    message: "Pick a Category",
    path: ["category"],
  });

// lets create a type alias that represents the shape of the data defined by our schema above so that we check for type when we get or form data
type FormData = z.infer<typeof schema>;

// we need to pass through our FormData into our Expense form so that when we use it in the App.tsx it will ask for the prop to be used and this is
interface ExpenseProps {
  // onHelpSubmit: (data:FormData) => void;
  fetchExpenses: () => void;
  addedData?: Expense;
}


// onHelpSubmit,        was orignally in the props passed through
const ExpenseForm = ({ fetchExpenses, addedData }: ExpenseProps) => {
  // in order to validate our form data on submit we need the following
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // useStates for holding the current data from our inputs
  const [inputData, setInputData] = useState({
    id: addedData?.id || 0,
    description: addedData?.description || "",
    amount: addedData?.amount || 0,
    category: addedData?.category || "",
  });

  // helper function for adding expenses
  const addExpense = () => {
    axios
      .post(`${BASE_URL}AddExpense`, inputData)
      .then((response) => {
        console.log(response);
        fetchExpenses();
      })
      .catch((error) => console.log(error));
      
  };

  return (
    <>
      <form onSubmit={handleSubmit(addExpense)}>
        {/* hidden input so that form still takes in a value for the form to pass submission requirements */}
        {/* <input type="hidden" {...register('id')} value={id}/> */}
        <div className="col mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Expense Name"
            className="form-control"
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            placeholder="0"
            className="form-control"
            onChange={(e) => setInputData({...inputData, amount: parseInt(e.target.value)})}
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            name="category"
            className="form-select"
            onChange={(e) => setInputData({...inputData, category: e.target.value})}
          >
            <option>Select a Category</option>
            {/* this map makes the options show in the select category field  notice the callback function */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* error for category shows below the select field */}
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>

        {/* <button className="btn btn-outline-primary mt-1" onClick={incrementID}>Submit</button> */}
        <button className="btn btn-outline-warning mt-1" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
