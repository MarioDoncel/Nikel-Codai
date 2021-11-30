const myModal = new bootstrap.Modal("#transaction-modal")
let logged = sessionStorage.getItem('logged')
const session = JSON.parse(localStorage.getItem('session'))


function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', JSON.stringify(session))
        logged = session
    }
    if(!logged) window.location.href = 'index.html'
}

function logout() {
    sessionStorage.removeItem('logged')
    localStorage.removeItem('session')
    window.location.href = 'index.html'
}

document.querySelector("#button-logout")
    .addEventListener('click', logout)


checkLogged()
let dataUser = JSON.parse(localStorage.getItem(logged))
getAllTransactions()

// Adicionar lançamento
const saveData = (data) => localStorage.setItem(data.login, JSON.stringify(data))

document.querySelector('#transaction-form')
    .addEventListener('submit', (event) => {
        event.preventDefault()
        const value = parseFloat(document.querySelector('#value-input').value)
        const description = document.querySelector('#description-input').value
        const date = document.querySelector('#date-input').value
        const type = document.querySelector('input[name="type-input"]:checked').value
        dataUser.transactions.unshift({
            value,
            type,
            description,
            date
        }
        )
        saveData(dataUser)
        alert('Lançamento realizado com sucesso')
        event.target.reset()
        myModal.hide()
        getAllTransactions()
    })


    function getAllTransactions() {
        if(!dataUser.transactions) return
        document.querySelector('#transactionsAll').innerHTML =''
       dataUser.transactions.forEach(({date, type,value, description}) => {
            value = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            date = date.split('-')
            date = `${date[2]}/${date[1]}/${date[0]}`
            let transactionsHtml = `
                <tr>
                    <th scope="row">${date}</th>
                    <td>${value}</td>
                    <td>${type == '1'? "Entrada" : "Saída"}</td>
                    <td>${description}</td>
                </tr>
           
           `
           document.querySelector('#transactionsAll').innerHTML += transactionsHtml
       });
    }