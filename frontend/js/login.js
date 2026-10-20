const btn_login = document.getElementById('btn_login')
const res = document.getElementById('res')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`
        if(dados.token){
            localStorage.setItem('token', dados.token)
            localStorage.setItem('usuario', dados.nome)
            window.location.href = '../index.html'
        }
    })
    .catch((err) => {
        console.error(err)
        res.innerHTML += `Erro ao realizar o login`
    })
})