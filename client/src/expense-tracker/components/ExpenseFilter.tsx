// this component needs to filter the categories that we want to see on the main app so we need to use create our interface with props consisting of a function
import categories from "../categories"

interface FilterProps {
    // this prop is for passing in the category item which is a string but I dont fully understand what its doing
    onSelectedCategory: (category:string) => void;
}
// why does the destructured function have to be wrapped in {} ??
const ExpenseFilter = ({onSelectedCategory}:FilterProps) => {
  return (
    <>
        <div className="col mb-3">
            <select className="form-select" onChange={(e) => onSelectedCategory(e.target.value)} >
                <option value="">All Categories</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
        </div>
    </>
  )
}

export default ExpenseFilter