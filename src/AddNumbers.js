import React, { useState } from 'react';

const AddNumbers=()=>{
    const[number1, setNumber1]=useState('')
    const[number2, setNumber2]=useState('')
    const[result,setResult]=useState(null)
    const handleAdd=()=>{
        const num1=parseInt(number1)
        const num2=parseInt(number2)
        setResult(num1*num2)

    };
    return (
        <div>
            <h1> Add two numbers</h1>
            <div>
        
        <label>
            Numnber1:
            <input type="text" value={number1}  onChange={(e) => setNumber1(e.target.value)}/>

        </label>
        </div>
        <div>
            <label>
                Number 2:
                <input type="text" value={number2} onChange={(e) => setNumber2(e.target.value)}/>
            </label>
        </div>
        <button onClick={handleAdd}>Add</button>
        {result !== null && <h2>Result: {result}</h2>}

        </div>
    )
}
export default AddNumbers