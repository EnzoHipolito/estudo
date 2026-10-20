const Cliente = require('./Cliente')
const Agendamento = require('./Agendamento')
const Veiculo = require('./Veiculo')

Cliente.hasMany(Veiculo, { 
    foreignKey: 'codCliente', 
    as: 'veiculoCliente', 
    onDelete: 'CASCADE' 
})

Veiculo.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: 'clienteVeiculo',
    allowNull: false
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'codCliente',
    as: 'agendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

Veiculo.hasOne(Agendamento, {
    foreignKey: 'codVeiculo',
    as: 'agendamentoVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo, {
    foreignKey: 'codVeiculo',
    as: 'veiculoAgendamento',
    allowNull: false
})

module.exports = { Agendamento, Veiculo, Cliente }