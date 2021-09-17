const Call = require('../models/calls')

module.exports = app  => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimento via GET'))

    app.post('/atendimentos', (req, res) => {
        const call = req.body

        Call.Adding(call, res)
    })
}