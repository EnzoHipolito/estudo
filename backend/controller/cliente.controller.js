const Cliente = require('../models/Cliente')
const cryptojs = require('crypto-js')
const chave_secreta = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    try{
        const cpfCripto = cryptojs.AES.encrypt(valores.cpf, chave_secreta).toString()
        const senhaCripto = cryptojs.AES.encrypt(valores.senha, chave_secreta).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            endereco: valores.endereco,
            telefone: valores.telefone
        })

        return res.status(201).json({message: "Cliente cadastrado com sucesso!"})
    }
    catch(err){
        console.error('Falha ao cadastrar cliente')
        return res.status(500).json({message: 'Falha ao cadastrar cliente'})
    }
}

const listar = async (req, res) => {
    try{
        const clientes = await Cliente.findAll()
        let resultado = []

        clientes.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = cryptojs.AES.decrypt(el.cpf, chave_secreta)
                cpfDescriptografado = bytes.toString(cryptojs.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                endereco: el.endereco,
                codCliente: el.telefone
            })
        })

        return res.status(200).json(resultado)
    }
    catch(err){
        console.error('Falha ao listar cliente')
        return res.status(500).json({message: 'Falha ao listar cliente'})
    }
}

const consultarPorId = async (req, res) => {
    const id = req.params.id
    
    try{
        const clientes = await Cliente.findOne({where: {codCliente: id}})

        return res.status(200).json({clientes})
    }
    catch(err){
        console.error('Falha ao listar cliente')
        return res.status(500).json({message: 'Falha ao listar cliente'})
    }
}

const consultarPorNome = async (req, res) => {
    const nome = req.params.nome
    
    try{
        const clientes = await Cliente.findOne({where: {nome: nome}})

        return res.status(200).json({clientes})
    }
    catch(err){
        console.error('Falha ao listar cliente')
        return res.status(500).json({message: 'Falha ao listar cliente'})
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    
    const clientes = await Cliente.findOne({where: {id: id}})

    if(!clientes){
        return res.status(404).json({message: 'Cliente não encontrado'})
    }

    try{
        await Cliente.update(valores, {where: {codCliente: id}})

        return res.status(200).json({message: 'Cliente atualizado com sucesso'})
    }
    catch(err){
        console.error('Falha ao atualizar cliente')
        return res.status(500).json({message: 'Falha ao atualizar cliente'})
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    
    const clientes = await Cliente.findOne({where: {id: id}})

    if(!clientes){
        return res.status(404).json({message: 'Cliente não encontrado'})
    }

    try{
        await Cliente.destroy({where: {codCliente: id}})

        return res.status(200).json({message: 'Cliente apagado com sucesso'})
    }
    catch(err){
        console.error('Falha ao apagar cliente')
        return res.status(500).json({message: 'Falha ao apagar cliente'})
    }
}

module.exports = { cadastrar, apagar, consultarPorId, consultarPorNome, atualizar, listar }