const logErro = require("../utils/logger");
const { ObjectId } = require("mongodb");

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
            return resultado.insertedId;
        } catch (erro) {
            logErro(`Usuario.inserir: ${erro.message}`);
            throw erro;
        }
    }

    async buscarPorId(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }
            const usuario = await this.collection.findOne({ _id: new ObjectId(id) });
            return usuario;
        } catch (erro) {
            logErro(`Usuario.buscarPorId: ${erro.message}`);
            throw erro;
        }
    }

    async deletar(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }
            const resultado = await this.collection.deleteOne({ _id: new ObjectId(id) });
            return resultado.deletedCount;
        } catch (erro) {
            logErro(`Usuario.deletar: ${erro.message}`);
            throw erro;
        }
    }
}

module.exports = Usuario;
