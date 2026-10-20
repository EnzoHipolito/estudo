const btn_listar = document.getElementById('btn_listar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/listar/agendamento', {
        method: 'GET',
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
            res.innerHTML +=
                `<table>
            <thead>
                ${thead()} 
            </thead>
            <tbody>
                ${tbody(dados)}
            </tbody>
        </table>`
        })
        .catch((err) => {
            console.error(err)
            res.innerHTML += `Erro ao realizar a listagem`
        })
})

function thead() {
    const head = `<tr>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Servico</th>
                    <th>Codigo Veiculo</th>
                    <th>Codigo Cliente</th>
                </tr>`

    return head
}

function tbody(dados) {
    let body = ``
    dados.forEach(el => {
        body += `<tr>
                    <td>${el.data}</td>        
                    <td>${el.horario}</td>        
                    <td>${el.servico}</td>        
                    <td>${el.codCliente}</td>        
                    <td>${el.codVeiculo}</td>        
                </tr>`
    });

    return body
}