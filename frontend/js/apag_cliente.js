const btn_consultar = document.getElementById('btn_consultar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCliente = Number(document.getElementById('codCliente').value)

    fetch(`http://localhost:3000/apagar/cliente/${codCliente}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': token }
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