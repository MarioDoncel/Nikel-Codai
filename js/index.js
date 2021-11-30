const myModal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')

checkLogged()


// Criar Conta
document.querySelector('#create-form')
    .addEventListener('submit', (event) => {
        event.preventDefault()
        const email = document.querySelector('#email-create-input').value
        const password = document.querySelector('#password-create-input').value
        if (email.length < 5) {
            alert("Preencha o campo e-mail com um e-mail valido.")
            return
        }
        if (password.length < 4) {
            alert("Preencha a senha com no minimo 4 digitos.")
            return
        }
        saveAccount({
            login: email,
            password,
            transactions:[]
        })
        alert('Conta criada com sucesso')
        myModal.hide()
    } )

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}

// Logar na conta
document.querySelector('#login-form')
    .addEventListener('submit', (event) => {
        event.preventDefault()
        const email = document.querySelector('#email-input').value
        const password = document.querySelector('#password-input').value
        const session = document.querySelector('#session-check').checked
        const account = getAccount(email)
        console.log(account)

        if (!account) return alert('Ooops! Verifique o usuário e senha.')
        if (account.password != password) return alert('Ooops! Verifique o usuário e senha.')

        saveSession(email, session) 

        window.location.href = 'home.html'

    })   


function getAccount(email) {
    const account = JSON.parse(localStorage.getItem(email)) 
    if (account) return account 
    return
}

const saveSession = (email, session) => session ? localStorage.setItem('session', JSON.stringify(email)) : sessionStorage.setItem('logged', JSON.stringify(email))

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session)
        logged = session
    }
    if(logged) window.location.href = 'home.html'
}