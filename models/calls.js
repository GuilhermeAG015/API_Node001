const moment = require('moment')
const Connection = require('../infrastructure/connection')
class Call {
    Adding(call, res){
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(call.date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const validDate = moment(date).isSameOrAfter(creationDate)
        const validName = call.client.length >= 5 

        const validations = [
            {
                name: 'date',
                valid: validDate,
                mensage: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'client',
                valid: validName,
                mensage: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validations.filter(camp => !camp.valid)

        const existErrors = errors.length

        if(existErrors) {
            res.status(400).json(errors)
        }
        else{
            const datedCall = {...call, creationDate, date}
        
            const sql = 'INSERT INTO Calls SET ?'
            
            Connection.query(sql, datedCall, (erro, result) => {
                if(erro){
                    res.status(400).json(erro)
                }
                else{
                    res.status(201).json(result)
                }
            })
        }
    }
}

module.exports = new Call