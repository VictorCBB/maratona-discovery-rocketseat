const Modal = {
    open() {
        //abrir modal
        //adicionar a classe active ao modal
        document
            .querySelector(".modal-overlay")
            .classList
            .add('active');
    },
    close(){
        //fechar modal
        //remover a classe active do modal
        document
            .querySelector(".modal-overlay")
            .classList
            .remove('active');
    }
};

const Transaction = {
    all: [
        {
            description: "luz",
            amount: -50000,
            date: "25/02/2022"
        },
        {
            description: "Criação de Website",
            amount: 500000,
            date: "25/02/2022"
        },
        {
            description: "Internet",
            amount: -20000,
            date: "25/02/2022"
        },
        {
            description: "App",
            amount: 200000,
            date: "01/03/2022"
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction);

        app.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        app.reload();
    },

    income() {
        let sumIncome = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                sumIncome += transaction.amount;
            }
        });
        return sumIncome;
    },
    expense() {
        let sumExpense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                sumExpense += transaction.amount;
            }
        });
        return sumExpense;
    },
    total() {
        return Transaction.income() + Transaction.expense();
    }
}

// Colocar no HTML os valores do objeto transactions 

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTrasaction(transactions, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transactions);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transactions) {
        const CSSClass = transactions.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transactions.amount);

        const html = `
        <tr>
            <td class="description">${transactions.description}</td>
            <td class=${CSSClass}>${amount}</td>
            <td class="date">${transactions.date}</td>
            <td>
                <img src="../src/assets/minus.svg" alt="Remover trasação">
            </td>
        </tr>
        `

        return html;
    },

    updateBalance() {
        document
        .getElementById("incomeDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.income());
        document
        .getElementById("expenseDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.expense());
        document
        .getElementById("totalDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100;
        
        return value;
    },

    formatDate(date) {
        const splittedDate = date.split("-");

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "" ;

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#Date"),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const {description, amount, date} = Form.getValues();
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    formatValues() {
        let {description, amount, date} = Form.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return {description, amount, date};
    },

    submit(event) {
        event.preventDefault();

        try {
            // verificar se as informações foram preenchidas
            Form.validateFields();
            // formatar os dados para salvar
            const transaction = Form.formatValues();
            // Apagar os dados do formulário
            // Modal feche
            // Atualizar a aplicação            
        } catch (error) {
            alert(error.message)
        }
        
    }
}

const app = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTrasaction(transaction);
    });

    DOM.updateBalance();

    },
    reload() {
        DOM.clearTransactions();
        app.init();
    }
};

app.init();

