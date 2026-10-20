const btn_consultar = document.getElementById('btn_consultar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCliente = Number(document.getElementById('codCliente').value)

    fetch(`http://localhost:3000/consultarPorId/cliente/${codCliente}`, {
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
            console.log(dados)
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
            res.innerHTML += `Erro ao realizar a consulta`
        })
})

function thead() {
    const head = `<tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Endereco</th>
                    <th>Telefone</th>
                </tr>`

    return head
}

function tbody(dados) {
    const body = ``
    
        body += `<tr>
                    <td>${dados.clientes.nome}</td>        
                    <td>${dados.cliente.email}</td>        
                    <td>${dados.cliente.senha}</td>        
                    <td>${dados.cliente.cpf}</td>        
                    <td>${dados.cliente.endereco}</td>        
                    <td>${dados.cliente.telefone}</td>        
                </tr>`
    
    return body
}