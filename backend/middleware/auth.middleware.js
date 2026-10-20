const cryptojs = require('crypto-js')
const chave_secreta = 'segredo'

function authMiddleware(res, req, next) {
    const token = req.headers['authorization']
    
    if(!token){
        return res.status(403).json({message: "Você deve estar logado para proseguir"})
    }

    try{
        const bytes = cryptojs.AES.decrypt(token, chave_secreta)
        const tokenDecript = bytes.toString(cryptojs.enc.Utf8)

        if(!tokenDecript){
            return res.status(403).json({message: "Token invalido!"})
        }

        const payload = JSON.parse(tokenDecript)
        
        if(Date.now() > tokenDecript.expiraEm){
            return res.status(403).json({message: "Token expirado, gere outro!"})
        }

        req.user = payload

        next()
    }
    catch(err){
        console.error("Erro na autenticação")
        return res.status(500).json({message: "Erro na autenticação"})
    }
}

module.exports = authMiddleware