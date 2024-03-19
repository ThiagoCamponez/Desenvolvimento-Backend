import Evento from "../Modelo/Eventos.js";

export default class EventosCtrl{

    gravar(requisicao, resposta){

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //Para extrair dados do corpo da requisição
            const nome_evento = dados.nome_evento;
            const nome_artista = dados.nome_artista;
            const valores_ingresso = dados.valores_ingresso;
            const cidade_uf = dados.cidade_uf;
            const endereco_evento = dados.endereco_evento;
            const dia = dados.dia;
            const mes = dados.mes;
            const ano = dados.ano;

            //É uma pseudo validação nos dados
            if (nome_evento && nome_artista && valores_ingresso && cidade_uf && endereco_evento && dia && mes && ano){
                const evento = new Evento(0, nome_evento, nome_artista, valores_ingresso, cidade_uf, endereco_evento, dia, mes, ano);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "O evento foi gravado com sucesso!",
                        "codigo_evento": evento.codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o evento informado! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um eventp!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; //Para extrair os dados do corpo da requisição
            //O código será extraído da url, exemplo: http://localhost:3000/cliente/1  1 é o código
            const codigo = requisicao.params.codigo;
            const nome_evento = dados.nome_evento;
            const nome_artista = dados.nome_artista;
            const valores_ingresso = dados.valores_ingresso;
            const cidade_uf = dados.cidade_uf;
            const endereco_evento = dados.endereco_evento;
            const dia = dados.dia;
            const mes = dados.mes;
            const ano = dados.ano;
            if (codigo && codigo > 0 && nome_evento  && nome_artista && valores_ingresso && cidade_uf && endereco_evento && dia && mes && ano)
            {
                const evento = new Evento(codigo, nome_evento, nome_artista, valores_ingresso, cidade_uf, endereco_evento, dia, mes, ano);
                evento.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "O evento foi atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um evento!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            //O código do cliente que será excluído será extraído da url
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const evento = new Evento(codigo);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "O evento foi excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o evento! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do evento que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um evento!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos)=>{
                resposta.status(200);
                resposta.json(eventos);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os eventos! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os eventos!"
            })
        }
    }

}