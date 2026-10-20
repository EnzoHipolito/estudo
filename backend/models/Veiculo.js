const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Veiculo = db.define('veiculos', {
    codVeiculo:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    modelo:{
        type: DataTypes.STRING(70),
        allowNull: false
    },
    marca:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    placa:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    codigoRastreador:{
        type: DataTypes.INTEGER,
        allowNull: false
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
    tableName: 'veiculos',
    timestamps: false
})

module.exports = Veiculo