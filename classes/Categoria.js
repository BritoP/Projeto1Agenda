const logErro = require("../utils/logger");
const { ObjectId } = require("mongodb");

class Categoria {
    constructor(db) {
        this.collection = db.collection("categorias");
    }

    async inserir(categoria) {
        try {
            if (!categoria.nome) {
                throw new Error("Campo obrigatório faltando: nome");
            }

            const resultado = await this.collection.insertOne(categoria);
            return resultado.insertedId;
        } catch (erro) {
            logErro(`Categoria.inserir: ${erro.message}`);
            throw erro;
        }
    }

    async buscarPorId(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }
            const categoria = await this.collection.findOne({ _id: new ObjectId(id) });
            return categoria;
        } catch (erro) {
            logErro(`Categoria.buscarPorId: ${erro.message}`);
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
            logErro(`Categoria.deletar: ${erro.message}`);
            throw erro;
        }
    }
}

module.exports = Categoria;
