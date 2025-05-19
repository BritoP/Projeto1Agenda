const conectar = require("./database/conexao");
const Usuario = require("./classes/Usuario");

async function main() {
    const db = await conectar();

    const usuarioDAO = new Usuario(db);

    await usuarioDAO.inserir({
        nome: "Pedro Otavio",
        email: "pedrootavio@email.com"
    });

}

main();
