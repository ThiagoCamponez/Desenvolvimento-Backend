import Eventos from "./Modelo/Eventos.js";


const eventos = new Eventos(4);

/*eventos.gravar().then(() => {
    console.log("Evento gravado com sucesso!");
}).catch((erro) => {
    console.log(erro.message);
});*/

/*eventos.atualizar().then(() => {
    console.log('Evento Atualizado!');
}).catch( (erro) => {
    console.log(erro.message);
});
*/

/*eventos.excluir().then(() =>{
    console.log('Evento excluído!');
}).catch( (erro) => {
    console.log(erro);
});*/

const eventoQQ = new Eventos();

eventoQQ.consultar(2).then((lista_eventos) => {
    console.log("Eventos encontrados:")
    for (const evento of lista_eventos) {
        console.log(evento.toJSON());
    }
}).catch((erro) => {
    console.log("Não foi possível consultar o evento", erro);
});