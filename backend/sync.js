const { Agendamento, Cliente, Veiculo } = require('./models/rel')
const db = require('./config/db')

async function syncDatabase() {
    try{
        await db.sync({force: true})
    }
    catch(err){
        console.error(err)
    }
    finally{
        await db.close()
    }
}

syncDatabase()