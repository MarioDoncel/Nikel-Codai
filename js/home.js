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
getTotal()

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
        getTotal()
    })


//Mostrar Laçamentos 

function  getCashIn() {
    document.querySelector('#cash-in-list').innerHTML = ''
    const cashIn = dataUser.transactions.filter(({type}) => type == "1")
    if(cashIn.length == 0) return 0
    const totalValue = cashIn.reduce((acc, {value}) => acc + value, 0)
    if (cashIn.length > 5) cashIn.length = 5
    
    
    cashIn.forEach(({value, description, date}) => {
        value = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        date = date.split('-')
        date = `${date[2]}/${date[1]}/${date[0]}`
        let cashInHtml = `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${value}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            document.querySelector('#cash-in-list').innerHTML += cashInHtml
    });
    return totalValue
}
function  getCashOut() {
    document.querySelector('#cash-out-list').innerHTML = ''
    const cashOut = dataUser.transactions.filter(({type}) => type == "2")
    if(cashOut.length == 0) return 0
    const totalValue = cashOut.reduce((acc, {value}) => acc + value, 0)
    if (cashOut.length > 5) cashOut.length = 5
    
    cashOut.forEach(({value, description, date}) => {
        value = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        date = date.split('-')
        date = `${date[2]}/${date[1]}/${date[0]}`
        let cashOutHtml = `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${value}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            document.querySelector('#cash-out-list').innerHTML += cashOutHtml
    });
    return totalValue
}
function getTotal() {
    if(!dataUser.transactions) return
    let cashPositive = getCashIn()
    let cashNegative = getCashOut()
    document.querySelector('#total')
        .innerText = Number(cashPositive-cashNegative)
                        .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

// Button all transactions

document.querySelector('#all-transactions')
    .addEventListener('click', () => window.location.href = 'transactions.html')
