const conectar = require("./database/conexao");
const Usuario = require("./classes/Usuario");
const Evento = require("./classes/Evento");
const Categoria = require("./classes/Categoria");

async function main() {
    const db = await conectar();

    const usuarioDAO = new Usuario(db);
    const eventoDAO = new Evento(db);
    const categoriaDAO = new Categoria(db);

    try {
        const idUsuario = await usuarioDAO.inserir({
            nome: "Pedro Otavio",
            email: "pedrootavio@email.com"
        });
        console.log("Usuário inserido com ID:", idUsuario);

        const idCategoria = await categoriaDAO.inserir({ nome: "Trabalho" });
        console.log("Categoria inserida com ID:", idCategoria);

        const idEvento = await eventoDAO.inserir({
            titulo: "Reunião",
            data: "2025-05-20",
            categoriaId: idCategoria,
            usuarioId: idUsuario
        });
        console.log("Evento inserido com ID:", idEvento);

    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

main();