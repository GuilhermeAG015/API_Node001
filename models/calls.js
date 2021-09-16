const Connection = require('../infrastructure/connection')

class Call {
    Adding(call){
        const sql = 'INSERT INTO Calls SET ?'
        Connection.query(sql, call, (erro, result) => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log(result)
            }
        })
    }
}

module.exports = new Call