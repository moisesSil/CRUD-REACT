import React, {useRef, useState } from "react";


import './CRUD.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function CRUD(){
    const list =[
        {
            id:1,
            name:"HP",
            price:"2222"
        },
        {
            id:2,
            name:"Dell",
            price:"24554"
        }
    ]
    const [lists, setList]= useState(list)
    const [updateState, setUpdateState] = useState(-1)

    return(
        <div className="crud">
            <div>
                <AddList setList ={setList} />
                <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) =>(
                        updateState === current.id ? <EdiList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.name}</td>
                            <td>{current.price}</td>
                            <td>
                                <Button onClick={() => handleEdit(current.id) } variant="contained" color="success" >Editar</Button>
                                <Button className="deletar"   variant="contained" color="error" type="button" onClick={() =>handleDelete(current.id)}>Deletar</Button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    )
    function handleEdit(id){
        setUpdateState(id); 
    }
    function handleDelete(id){
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
         alert("item excluido ")
    }
    function handleSubmit(event){
        alert("intem editado com sucesso")
        event.preventDefault()
        const name = event.target.elements.name.value
        const price = event.target.elements.price.value
        const newlist = lists.map((li)=>(
            li.id === updateState?{...li, name:name, price: price} :li
        ))
        setList(newlist)
        setUpdateState(-1)
    }
}
function EdiList({current, lists, setList}){

    const [newValue, setNewValue] = useState(current);

    function handleInputname(event){
       
        setNewValue({name: event.target.value, price: newValue.price})
        
        
    //  const value = event.target.value
    //  const newlists =  lists.map((li)=> (
        //         li.id === current.id ? {...li,name:value}: li
        //     ))
        //     setList(newlists)
    }
    function handleInputprice(event){
        
        setNewValue({price: event.target.value, name: newValue.name})
    //     const value = event.target.value
    //   const newlists =  lists.map((li)=> (
    //         li.id === current.id ? {...li,price:value}: li
    //     ))
    //     setList(newlists)
    }
    return(
        <tr>
           <td><TextField  style={{background:"white"}} type="text" onChange={handleInputname} name="name" value={newValue.name} required/></td>
            <td><TextField  style={{background:"white"}}  type="text"onChange={handleInputprice} name="price" value={newValue.price} required/></td>
           <Button variant="contained" type="submit" >concluir</Button>
       </tr>
    )    
}

function AddList({setList}){
    const nameRef = useRef()
    const priceRef = useRef()
     function handleSubmit(event){
        event.preventDefault();
         alert("adicionado com sucesso")
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;
        const newlist ={
            id:Math.random(),
            name,
            price
        }
        if(name===""){
            
             alert("o Campo nome está em branco ")
            return false;
        }
        if(price===""){
            alert("o campo do valor do produto esta em branco ")
            return false
        } 
        setList((prevList)=>{
            return prevList.concat(newlist);
        })
        nameRef.current.value = ""
        priceRef.current.value = ""
    }
    return(
        <Box>
          <form  className="addForm" onSubmit={handleSubmit}>
            {/* <TextField  id="standard-basic" variant="standard"  name="name" label="Digite o nome do produto"  ref={nameRef}/>
            <TextField  id="standard-basic"  variant="standard"  name="price" label="Digite o preço do produto" ref={priceRef} /> */}
            { <input type="text" className="nomeInput" name="name" placeholder="Digite o nome do produto"  ref={nameRef}/> }
            { <input type="text" className="nomeInput"  name="price" placeholder="Digite o preço do produto" ref={priceRef} /> }
           
            <Button variant="contained" type="submit">Adicionar</Button>
        </form>
        </Box>    
    )
}
export default CRUD;