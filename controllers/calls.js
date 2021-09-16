module.exports = app  => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimento via GET'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Rota de stendimento via post')
    })
}