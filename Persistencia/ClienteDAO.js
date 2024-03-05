import conectar from "./Conexao.js";
import Cliente from "../Modelos/Cliente.js";

//Client Access Object  --- É a camada que se conecta com o Banco de Dados

export default class ClienteDAO{
    async gravar(evento){
        if(evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (nome_evento, nome_artista, valores_ingresso, cidade_uf, endereco_evento, dia, mes, ano)
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.nome_evento,
                evento.nome_artista,
                evento.valores_ingresso,
                evento.cidade_uf,
                evento.endereco_evento,
                evento.dia,
                evento.mes,
                evento.ano
            ];
            const [resultados, campos] = await conexao.execute(sql, parametros);
            evento.codigo = resultados.insertId; //Recupera o ID gerado pelo banco de dados
        }
    }

        async atualizar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET nome_evento = ?, nome_artista = ?, valores_ingresso = ?, cidade_uf = ?, endereco_evento = ?, dia = ?, mes = ?, ano = ? WHERE id = ?`;
            const parametros = [
                evento.nome_evento,
                evento.nome_artista,
                evento.valores_ingresso,
                evento.cidade_uf,
                evento.endereco_evento,
                evento.dia,
                evento.mes,
                evento.ano,
                evento.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento){
        if(evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.codigo
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