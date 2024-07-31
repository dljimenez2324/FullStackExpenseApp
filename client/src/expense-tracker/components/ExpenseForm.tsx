import categories from "../categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



// in order to use zod we need to make our schema
const schema = z
.object({
    // note that id was   id: z.number(),    before change to nanoid
    id: z.string().nanoid(),
    description: z.string().min(3, {message: "Need at least 3 letters"}),
    amount: z.number(),
    category: z.string()
})
.refine((data) => data.category !== 'Select a Category', {
    message: "Pick a Category",
    path: ["category"]
})

// lets create a type alias that represents the shape of the data defined by our schema above so that we check for type when we get or form data
type FormData = z.infer<typeof schema>

// we need to pass through our FormData into our Expense form so that when we use it in the App.tsx it will ask for the prop to be used and this is 
interface ExpenseProps {
    onHelpSubmit: (data:FormData) => void;
}

const ExpenseForm = ({onHelpSubmit}:ExpenseProps) => {

    // use a useState to create an ID using nanoid notice how I'm using this form of using useState
    const[id] = useState(nanoid());

    // in order to validate our form data on submit we need the following
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)});

    
    console.log("These are your errors: ", errors);

    // since we need to pass in props so that our app.tsx can see our data from the form.  this below is no longer needed as it only console logs and we did not make it live outside the form
    // // make a helper function to show the Field Values after a submission to know how the data looks
    // const onHelpSubmit = (data:FieldValues) => {
        
    //     // all of this is commented out to try using a hidden input instead
    //     // // make a new ID when the form is submitted using nanoID which is faster than UUID and more secure than using a random number generator as well as being unique
    //     // const newID = nanoid();
        
    //     // // lets see all the data before the New ID is added
    //     // console.log(data);

    //     // // make new object which will include the new ID
    //     // const formDataWithID = {
    //     //     ...data,
    //     //     id: newID
    //     // };

    //     // // attempting to force the data to include the id provided
    //     // data = formDataWithID;
    //     // see what the formData with ID looks like
    //     console.log('Form Data with New ID: ', data);


    // };


   

  return (
    <>
        
        <form onSubmit={handleSubmit(onHelpSubmit)}>
            
            {/* hidden input so that form still takes in a value for the form to pass submission requirements */}
            <input type="hidden" {...register('id')} value={id}/>
            <div className="col mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} id="description" type="text" placeholder="" className="form-control" />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>

            <div className="col mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', {valueAsNumber: true})} id="amount" type="number" placeholder="0" className="form-control" />
                {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
            </div>

            <div className="col mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select {...register('category')} id="category" name="category" className="form-select">
                    <option>Select a Category</option>
                    {/* this map makes the options show in the select cagetory field  notice the callback function */}
                    {categories.map(category => <option key={category} value={category} >{category}</option>)}
                </select>
                {/* error for category shows below the select field */}
                {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>

            {/* <button className="btn btn-outline-primary mt-1" onClick={incrementID}>Submit</button> */}
            <button className="btn btn-outline-warning mt-1" type="submit">Submit</button>
        </form>
    </>
  );
};

export default ExpenseForm