import Eventos from "./Modelo/Eventos.js";


const eventos = new Eventos(3);

/*eventos.gravar().then(() => {
    console.log("Evento gravado com sucesso!");
}).catch((erro) => {
    console.log(erro.message);
});*/

/*eventos.atualizar().then(() => {
    console.log('Evento Atualizado!');
}).catch( (erro) => {
    console.log(erro.message);
});*/

eventos.excluir().then(() =>{
    console.log('Evento excluído!');
}).catch( (erro) => {
    console.log(erro);
});
