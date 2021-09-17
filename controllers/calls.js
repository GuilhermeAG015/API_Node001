const calls = require('../models/calls')
const Call = require('../models/calls')

module.exports = app  => {
    app.get('/atendimentos', (req, res) => {
        Call.List(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const Id = parseInt(req.params.id)

        calls.SearchForId(Id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const call = req.body

        Call.Adding(call, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const Id = parseInt(req.params.id)
        const Values = req.body

        Call.Update(Id, Values, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const Id = parseInt(req.params.id)

        Call.Delete(Id, res)
    })
}