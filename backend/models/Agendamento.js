const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Agendamento = db.define('agendamentos', {
    codAgendamento:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horario:{
        type: DataTypes.TIME,
        allowNull: false
    },
    servico:{
        type: DataTypes.ENUM('REVISAO, MANUTENCAO, INSTALACAO'),
        allowNull: false
    },
    codVeiculo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
    },
    codCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
},{
    tableName: 'agendamentos',
    timestamps: false
})

module.exports = Agendamento