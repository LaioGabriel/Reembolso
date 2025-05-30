const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "");
    amount.value = value; 
    value = Number(value) / 100; 


    amount.value = FormatCurrency(value);
}
function FormatCurrency(value){
value = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
})
return value;
}

form.onsubmit = (event) => {
event.preventDefault();


const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date().toLocaleDateString("pt-br", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })
    
}
console.log(newExpense);
}

