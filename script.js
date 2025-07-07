const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

const expenseList = document.querySelector("ul");

amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "");
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
expenseAdd(newExpense);
}

function expenseAdd(newExspense){
    try {
        // Cria um elemento html li e adiciona na classe "expense"
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");
        
        //cria a imagem e define o src e alt
       const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src",`img/${newExspense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExspense.category_name);

        //Cria um elemento html span e adiciona o valor da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        //Cria um elemento html strong e adiciona o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExspense.expense;

        //Cria um elemento html span e adiciona o nome da categoria
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExspense.category_name;



        expenseInfo.append(expenseName, expenseCategory);
        
        //Adiciona a imagem na li criada
        expenseItem.append(expenseIcon);
        //Adiciona a li na ul referenciada no topo do codigo
        expenseList.append(expenseItem)
        //Adiciona o valor da despesa na li criada
        expenseItem.append(expenseInfo)
       

        
    }catch (error) {
      alert("Erro ao adicionar despesa, recarregue a página e tente novamente, se o erro se repetir favor contatar o suporte." );
    }

   
}
