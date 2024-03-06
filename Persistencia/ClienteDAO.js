import conectar from "./Conexao.js";
import Eventos from "../Modelo/Eventos.js";

//Client Access Object  --- É a camada que se conecta com o Banco de Dados

export default class ClienteDAO{
    async gravar(eventos){
        if(eventos instanceof Eventos){
            const conexao = await conectar();
            const sql = `INSERT INTO eventos (nome_evento, nome_artista, valores_ingresso, cidade_uf, endereco_evento, dia, mes, ano)
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                eventos.nome_evento,
                eventos.nome_artista,
                eventos.valores_ingresso,
                eventos.cidade_uf,
                eventos.endereco_evento,
                eventos.dia,
                eventos.mes,
                eventos.ano
            ];
            const [resultados, campos] = await conexao.execute(sql, parametros);
            eventos.codigo = resultados.insertId; //Recupera o ID gerado pelo banco de dados
        }
    }

        async atualizar(eventos){
        if (eventos instanceof Eventos){
            const conexao = await conectar();
            const sql = `UPDATE eventos SET nome_evento = ?, nome_artista = ?, valores_ingresso = ?, cidade_uf = ?, endereco_evento = ?, dia = ?, mes = ?, ano = ? WHERE id = ?`;
            const parametros = [
                eventos.nome_evento,
                eventos.nome_artista,
                eventos.valores_ingresso,
                eventos.cidade_uf,
                eventos.endereco_evento,
                eventos.dia,
                eventos.mes,
                eventos.ano,
                eventos.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(eventos){
        if(eventos instanceof Eventos){
            const conexao = await conectar();
            const sql = `DELETE FROM eventos WHERE id = ?`;
            const parametros = [
                eventos.codigo
            ];
            await conexao.execute(sql,parametros);
        }
    }

    //Termo de pesquisa pode ser um código do cliente ou ainda o nome
    async consultar(termoDePesquisa){
        if(termoDePesquisa === undefined){
            termoDePesquisa = "";
        }

        let sql="";
        if(isNaN(termoDePesquisa)){//Termo de pesquisa não é um número
            sql = `SELECT * FROM evento WHERE nome LIKE ?`;
            termoDePesquisa = '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM evento WHERE id = ?`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, [termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo evento
        let lista_eventos = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.id,
                registro.nome_evento,
                registro.nome_artista,
                registro.valores_ingresso,
                registro.cidade_uf,
                registro.endereco_evento,
                registro.dia,
                registro.mes,
                registro.ano
            );
            lista_eventos.push(evento);
        }
        return lista_eventos;
    }
}