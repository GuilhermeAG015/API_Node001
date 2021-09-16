class Tables {
    init(Connection){
        this.Connection = Connection

        this.createCalls()
    }

    createCalls() {
        const sql = 'CREATE TABLE IF NOT EXISTS Calls (id int NOT NULL AUTO_INCREMENT, client varchar(50), pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))'
        this.Connection.query(sql, erro => {
            if(erro){
                console.log('Erro ao inicializar')
            }
            else{
                console.log('Inicializado com sucesso')
            }
        })
    }
}

module.exports = new Tables