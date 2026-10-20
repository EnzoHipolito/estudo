const btn_atualizar = document.getElementById('btn_atualizar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        servico: document.getElementById('servico').value,
        codVeiculo: Number(document.getElementById('codVeiculo').value),
        codCliente: Number(document.getElementById('codCliente').value),
    }

    const id = document.getElementById('codAgendamento')
    
    fetch(`http://localhost:3000/atualizar/agendamento/${id}`, {
        method: 'PUT',
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
        res.innerHTML += `Erro ao realizar a atualização`
    })
})