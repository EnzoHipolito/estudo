const verific_log = document.getElementById('verific_log')
const realizeLogin = document.getElementById('realizeLogin')
const token = localStorage.getItem('token')
const user = localStorage.getItem('usuario')

if(token && user){
    realizeLogin.innerHTML = ''
    verific_log.innerHTML = ``
    verific_log.innerHTML += `<a href="#" id="btn_logout">Logout</a> &emsp;`
    verific_log.innerHTML += `Olá, ${user}`
    
    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    })
}else{
    realizeLogin.innerHTML = 'Para criar uma conta, acesse a pagina de <a href="./html/cad_cliente">Cadastrar Cliente</a>, depois, Faça login e acesse as outras paginas do sistema!'
}