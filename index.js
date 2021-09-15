const CustomExpress = require('./config/CustomExpress')

const app = CustomExpress()

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))