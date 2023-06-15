import React,{useState} from "react";

const SearchBox = () => {

    const [input,setInput] = useState();
    
    const handleChange = (value:any) => {
        setInput(value);
    }
    
     return(
         <div>
             <input 
                className="form-control pl-0" 
                style={{width:"421px"}}
                type="text" 
                placeholder="Enter search here..."
                value = {input} 
                onChange = {(e) => handleChange(e.target.value)} 
             />
         </div>
     )
}

export default SearchBox;


