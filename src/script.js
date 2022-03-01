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

const transactions = [
    {
        id: 1,
        description: "luz",
        amount: -50000,
        date: "25/02/2022"
    },
    {
        id: 2,
        description: "Criação de Website",
        amount: 500000,
        date: "25/02/2022"
    },
    {
        id: 3,
        description: "Internet",
        amount: -20000,
        date: "25/02/2022"
    },
    {
        id: 4,
        description: "App",
        amount: 200000,
        date: "01/03/2022"
    }
];


const Transaction = {
    income() {
        let sumIncome = 0;
        transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                sumIncome += transaction.amount;
            }
        });
        return sumIncome;
    },
    expense() {
        let sumExpense = 0;
        transactions.forEach(transaction => {
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

    updateBalance () {
        document
        .getElementById("incomeDisplay")
        .innerHTML = Transaction.income();
        document
        .getElementById("expenseDisplay")
        .innerHTML = Transaction.expense();
        document
        .getElementById("totalDisplay")
        .innerHTML = Transaction.total();
    }
}

const Utils = {
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


transactions.forEach(function (transactions) {
    DOM.addTrasaction(transactions);
});

DOM.updateBalance();
