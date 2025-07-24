const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseTotal = document.querySelector("aside header h2");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");

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

function expenseAdd(newExpense) {
    try {
        // Cria o elemento para a adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona o nome e a categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // Criando o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`
        //ICONE DE REMOVER
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "Remover despesa");


        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem)
        updateTotal();
        formCLear();

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }

}
   
function updateTotal() {
    try{ 
        const items = expenseList.children
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        let total = 0;
    for(let i = 0; i < items.length; i++) {
        const itemAmount = items[i].querySelector(".expense-amount")
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
        value = parseFloat(value); 
        if (!isNaN(value)) {
            total += Number(value)  
        }else{
            alert("Valor inválido encontrado na lista de despesas.")
        }

    }

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"
    expenseTotal.innerHTML = ""
    
   total = FormatCurrency(total).toUpperCase().replace("R$", "")
   expenseTotal.append(symbolBRL, total)
     
    }catch (error) {
        console.log(error) 
        alert("Não foi possível atualizar o total de despesas.")
    }
    
}  
expenseList.onclick = (event) => {
    if(event.target.classList.contains("remove-icon")) {
        const item = event.target.closest("li")
        item.remove()
        updateTotal()
    }
} 

function formCLear() {
    form.reset()
    amount.value = ""
    amount.oninput()
}