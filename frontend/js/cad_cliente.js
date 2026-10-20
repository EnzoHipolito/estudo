const btn_cadastrar = document.getElementById('btn_cadastrar')
const res = document.getElementById('res')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value
    }

    
    fetch('http://localhost:3000/cadastrar/cliente', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`
    })
    .catch((err) => {
        console.error(err)
        res.innerHTML += `Erro ao realizar o cadastro`
    })
})