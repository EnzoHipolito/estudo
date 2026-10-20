const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const db = require('./config/db')
const clienteController = require('./controller/cliente.controller')
const agendamentoController = require('./controller/agendamento.controller')
const veiculoController = require('./controller/veiculo.controller')
const authController = require('./controller/auth.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Aplicação rodando!'})
})

app.post('/cadastrar/cliente', clienteController.cadastrar)
app.get('/listar/cliente', clienteController.listar)
app.get('/consultarPorNome/cliente/:nome', clienteController.consultarPorNome)
app.get('/consultarPorId/cliente/:id', clienteController.consultarPorId)
app.delete('/apagar/cliente/:id', clienteController.apagar)
app.put('/atualizar/cliente/:id', clienteController.atualizar)

app.post('/cadastrar/veiculo', veiculoController.cadastrar)
app.get('/listar/veiculo', veiculoController.listar)

app.post('/cadastrar/agendamento', agendamentoController.cadastrar)
app.get('/listar/agendamento', agendamentoController.listar)
app.put('/atualizar/agendamento/:id', agendamentoController.atualizar)

app.post('/login', authController.login)

db.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta 3000')
    })
})
.catch((err) => {
    console.error('Falha ao inicializar servidor')
})