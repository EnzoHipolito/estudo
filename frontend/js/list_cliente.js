const btn_listar = document.getElementById('btn_listar')
const res = document.getElementById('res')

const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/listar/cliente', {
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
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Cpf</th>
                    <th>Endereco</th>
                    <th>Telefone</th>
                </tr>`

    return head
}

function tbody(dados) {
    let body = ``
    dados.forEach(el => {
        body += `<tr>
                    <td>${el.nome}</td>        
                    <td>${el.email}</td>        
                    <td>${el.senha}</td>        
                    <td>${el.cpf}</td>        
                    <td>${el.endereco}</td>        
                    <td>${el.telefone}</td>        
                </tr>`
    });

    return body
}