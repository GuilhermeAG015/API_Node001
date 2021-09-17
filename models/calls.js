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
                    res.status(201).json(datedCall)
                }
            })
        }
    }
    List(res){
        const sql = 'SELECT * FROM calls'

        Connection.query(sql, (error, result) => {
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json(result)
            }
        })
    }
    SearchForId(Id, res){
      const sql = `SELECT * FROM  calls WHERE id=${Id}`
      
      Connection.query(sql, (error, result) => {
          const callSpecific = result[0]
          if(error){
              res.status(400).json(error)
          }
          else{
              res.status(200).json(callSpecific)
          }
      })
    }
    Update(Id, Values, res){
        if(Values.date){
            Values.date = moment(Values.date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE calls SET ? WHERE id=?'

        Connection.query(sql, [Values, Id], (error, result) => {
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json({...Values, Id})
            }
        })
    }
    Delete(Id, res){
        const sql = 'DELETE FROM calls WHERE id=?'

        Connection.query(sql, Id, (error, result) => {
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new Call