const Agendamento = require('../models/Agendamento')

const cadastrar = async (req, res) => {
    const valores = req.body

    try{
        await Agendamento.create(valores)

        return res.status(201).json({message: "Agendamento cadastrado com sucesso!"})
    }
    catch(err){
        console.error('Falha ao cadastrar Agendamento')
        return res.status(500).json({message: 'Falha ao cadastrar Agendamento'})
    }
}

const listar = async (req, res) => {
    try{
        const agendamentos = await Agendamento.findAll({raw: true})

        return res.status(200).json({agendamentos})
    }
    catch(err){
        console.error('Falha ao listar Agendamento')
        return res.status(500).json({message: 'Falha ao listar Agendamento'})
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    
    const agendamentos = await Agendamento.findOne({where: {id: id}})

    if(!agendamentos){
        return res.status(404).json({message: 'Agendamento não encontrado'})
    }

    try{
        await Agendamento.update(valores, {where: {codAgendamento: id}})

        return res.status(200).json({message: 'Agendamento atualizado com sucesso'})
    }
    catch(err){
        console.error('Falha ao atualizar Agendamento')
        return res.status(500).json({message: 'Falha ao atualizar Agendamento'})
    }
}

module.exports = { cadastrar, atualizar, listar }