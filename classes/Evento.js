const logErro = require("../utils/logger");
const { ObjectId } = require("mongodb");

class Evento {
    constructor(db) {
        this.collection = db.collection("eventos");
    }

    async inserir(evento) {
        try {
            if (!evento.titulo || !evento.data) {
                throw new Error("Campos obrigatórios faltando: titulo e data");
            }

            const resultado = await this.collection.insertOne(evento);
            return resultado.insertedId;
        } catch (erro) {
            logErro(`Evento.inserir: ${erro.message}`);
            throw erro;
        }
    }

    async buscarPorId(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }
            const evento = await this.collection.findOne({ _id: new ObjectId(id) });
            return evento;
        } catch (erro) {
            logErro(`Evento.buscarPorId: ${erro.message}`);
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
            logErro(`Evento.deletar: ${erro.message}`);
            throw erro;
        }
    }
}

module.exports = Evento;
