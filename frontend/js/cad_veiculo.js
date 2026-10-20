const btn_cadastrar = document.getElementById('btn_cadastrar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        placa: document.getElementById('placa').value,
        codCliente: Number(document.getElementById('codCliente').value)
    }

    
    fetch('http://localhost:3000/cadastrar/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify(valores)
    })
    .then(res => {
            if (!res.ok) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                throw new Error('Sessão expirada')
            }
            return res.json()
        })
    .then(dados => {
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`
    })
    .catch((err) => {
        console.error(err)
        res.innerHTML += `Erro ao realizar o cadastro`
    })
})