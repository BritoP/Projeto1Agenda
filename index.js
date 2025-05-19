const conectar = require("./database/conexao");
const Usuario = require("./classes/Usuario");
const Evento = require("./classes/Evento");
const Categoria = require("./classes/Categoria");

async function main() {
    const db = await conectar();

    const usuarioTeste = new Usuario(db);
    const eventoTeste = new Evento(db);
    const categoriaTeste = new Categoria(db);

    try {
        const idUsuario = await usuarioTeste.inserir({
            nome: "Pedro Otavio",
            email: "pedrootavio@email.com"
        });
        console.log("ID do Usuário: ", idUsuario);

        const idCategoria = await categoriaTeste.inserir({ nome: "Importante" });
        console.log("ID da Categoria:", idCategoria);

        const idEvento = await eventoTeste.inserir({
            titulo: "Discord",
            data: "2025-06-21",
            categoriaId: idCategoria,
            usuarioId: idUsuario
        });
        console.log("ID do Evento:", idEvento);

    } catch (err) {
        console.error("Erro:", err.message);
    }
}

main();