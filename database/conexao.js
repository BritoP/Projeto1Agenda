const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function conectar() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB");
        return client.db("agenda");
    } catch (erro) {
        console.error("Erro de conexão:", erro);
        throw erro;
    }
}

module.exports = conectar;
