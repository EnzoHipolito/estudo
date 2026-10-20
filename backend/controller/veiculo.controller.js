const Veiculo = require('../models/Veiculo')
const cryptojs = require('crypto-js')
const chave_secreta = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    try{
        const codigoCripto = cryptojs.AES.encrypt(valores.cpf, chave_secreta).toString()

        await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: valores.placa,
            codigoRastreador: codigoCripto,
            codCliente: valores.codCliente,
        })

        return res.status(201).json({message: "Veiculo cadastrado com sucesso!"})
    }
    catch(err){
        console.error('Falha ao cadastrar Veiculo')
        return res.status(500).json({message: 'Falha ao cadastrar Veiculo'})
    }
}

const listar = async (req, res) => {
    try{
        const veiculos = await Veiculo.findAll({raw: true})

        return res.status(200).json({veiculos})
    }
    catch(err){
        console.error('Falha ao listar Veiculo')
        return res.status(500).json({message: 'Falha ao listar Veiculo'})
    }
}

module.exports = { cadastrar,  listar }