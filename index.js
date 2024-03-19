/*import Eventos from "./Modelo/Eventos.js";


const eventos = new Eventos(4);

eventos.gravar().then(() => {
    console.log("Evento gravado com sucesso!");
}).catch((erro) => {
    console.log(erro.message);
});

eventos.atualizar().then(() => {
    console.log('Evento Atualizado!');
}).catch( (erro) => {
    console.log(erro.message);
});


eventos.excluir().then(() =>{
    console.log('Evento excluído!');
}).catch( (erro) => {
    console.log(erro);
});

const eventoQQ = new Eventos(1);

eventoQQ.consultar(1).then((lista_eventos) => {
    console.log("Eventos encontrados:")
    for (const evento of lista_eventos) {
        console.log(evento.toJSON());
    }
}).catch((erro) => {
    console.log("Não foi possível consultar o evento", erro);
});*/



import express from "express";
import rotaEvento from "./Rotas/rotaEvento.js";

const host = '0.0.0.0'; //IP genérico que representa todas as interfaces (placas de rede)
const porta = 3000; //Sempre utilize portas com valor maior que 1024

const app = express();
app.use(express.json()); //configurando o express para saber interpretar o formato JSON
app.use(express.urlencoded({ extended: true })); //configurando o express para saber interpretar o formato URL utilizando a biblioteca QueryString
//app.use('/caminho', rotaCaminho);
app.use('/eventos',rotaEvento);
//app.use('/produtos', rotaProduto);  //Exemplo de como uma aplicação pode ter mais de uma rota ou endpoint
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});