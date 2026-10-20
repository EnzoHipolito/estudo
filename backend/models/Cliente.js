const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Cliente = db.define('clientes', {
    codCliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING(11),
        allowNull: false
    },
},{
    tableName: 'clientes',
    timestamps: false
})

module.exports = Cliente