const logErro = require("../utils/logger");

class Usuario {
    constructor(db) {
        this.collection = db.collection("usuarios");
    }

    async inserir(usuario) {
        try {
            if (!usuario.nome || !usuario.email) {
                throw new Error("Campos obrigatórios faltando: nome e email");
            }

            const resultado = await this.collection.insertOne(usuario);
            console.log("Usuário inserido:", resultado.insertedId);
        } catch (erro) {
            console.error("Erro ao inserir usuário:", erro.message);
            logErro(`Usuario.inserir: ${erro.message}`);
        }
    }

}

module.exports = Usuario;
