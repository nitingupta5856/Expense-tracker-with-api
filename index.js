function onsubmitbtn(event){
    event.preventDefault();
 const expenseamount =event.target.expenseamount.value;
 const description =event.target.description.value;
 const category =event.target.category.value;
//  console.log(event);
 const obj={
    expenseamount,
    description,
    category
 }
//  localStorage.setItem(obj.expenseamount,JSON.stringify(obj))
axios.post('https://crudcrud.com/api/e12229da670242aba7e945b0b737a500/ExpenseTracker',obj)
.then((res)=>{
 console.log(res);
 showNewExpense(res);
})
.catch((err)=>{
console.log(err);
})
//  showNewExpense(obj);
}


 function  showNewExpense(user){
    document.getElementById('expenseamount').value='';
    document.getElementById('description').value='';
    document.getElementById('category').value='';
  
   
const parentnode=document.getElementById('parentnode');
const childnode =`<li id=${user._id}>${user.expenseamount}  - ${user.description} - ${user. category}
<button onClick=deleteExpense('${user._id}')>Delete Expense</button>
<button onClick=editExpense('${user.expenseamount}','${user.description}','${user.category}','${user._id}')>Edit Expense</button>
</li>`
parentnode.innerHTML=parentnode.innerHTML+childnode;
}

window.addEventListener("DOMContentLoaded",()=>{

   axios.get('https://crudcrud.com/api/e12229da670242aba7e945b0b737a500/ExpenseTracker')
.then((res)=>{
 console.log(res);
 for(var i=0;i<res.length;i++){
  console.log(res[i])
  showNewExpense(res[i]);
 }
})
.catch((err)=>{
console.log(err);
})



   //  const localStorageObj =localStorage;
   //  const localStoragekeys =Object.keys(localStorageObj);
   //  for(var i=0;i<localStoragekeys.length;i++){

   //      const userDetailsObj= JSON.parse(localStorageObj[localStoragekeys[i]])
   //      showNewExpense(userDetailsObj);
       
   //  }
 })

 function editExpense(expenseamount,description,category,userID){
  
  const Expenseamount= document.getElementById('expenseamount').value=expenseamount;
  const Description= document.getElementById('description').value=description;
  const Category= document.getElementById('category').value=category;
  const obj={
   Expenseamount,
   Description,
   Category
  }

  
   axios.put(`https://crudcrud.com/api/e12229da670242aba7e945b0b737a500/ExpenseTracker/${userID}`,{
     obj
   })
   .then((res)=>{
    console.log(userID);
    deleteExpense (userID)
   
  
   })
   .catch((err)=>{
   console.log(err);
   })
 
   
   
}

 function deleteExpense (userID){

   axios.delete(`https://crudcrud.com/api/e12229da670242aba7e945b0b737a500/ExpenseTracker/${userID}`)
   .then((res)=>{
    console.log(userID);
    removeExpenseFromScreen(userID)
  
   })
   .catch((err)=>{
   console.log(err);
   })
   
   //  console.log(expenseamount)
   //  localStorage.removeItem(expenseamount);
   //  removeExpenseFromScreen(expenseamount)
   }
   function  removeExpenseFromScreen(userID){
    const parentnode=document.getElementById('parentnode');
    const childNodeForDelete=document.getElementById(userID);
   if(childNodeForDelete){
    parentnode.removeChild(childNodeForDelete);
   }
    
   }



