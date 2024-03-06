import EventosDAO from "../Persistencia/EventosDAO.js";

export default class Eventos{
    
    #id;
    #nome_evento;
    #nome_artista;
    #valores_ingresso;
    #cidade_uf;
    #endereco_evento;
    #dia;
    #mes;
    #ano;

    constructor(id = 0, nome_evento = "", nome_artista = "", valores_ingresso = "", cidade_uf = "", endereco_evento = "", dia = "", mes = "", ano = ""){
        this.#id = id;
        this.#nome_evento = nome_evento;
        this.#nome_artista = nome_artista;
        this.#valores_ingresso = valores_ingresso;
        this.#cidade_uf = cidade_uf;
        this.#endereco_evento = endereco_evento;
        this.#dia = dia;
        this.#mes = mes;
        this.#ano = ano;
    }

    get codigo(){
        return this.#id;
    }

    set codigo(novoCodigo){
        this.#id = novoCodigo;
    }


    get nome_evento(){
        return this.#nome_evento;
    }

    set nome_evento(novoNome_evento){
        this.#nome_evento = novoNome_evento;
    }

    get nome_artista(){
        return this.#nome_artista;
    }

    set nome_artista(novoNome_artista){
        this.#nome_artista = novoNome_artista;
    }

    get valores_ingresso(){
        return this.#valores_ingresso;
    }

    set valores_ingresso(novoValor_ingresso){
        this.#valores_ingresso = novoValor_ingresso;
    }

    get cidade_uf(){
        return this.#cidade_uf;
    }

    set cidade_uf(novaCidade_uf){
        this.#cidade_uf = novaCidade_uf;
    }

    get endereco_evento(){
        return this.#endereco_evento;
    }

    set endereco_evento(novoEndereco_evento){
        this.#endereco_evento = novoEndereco_evento;
    }

    get dia(){
        return this.#dia;
    }

    set dia(novoDia){
        this.#dia = novoDia;
    }

    get mes(){
        return this.#mes;
    }

    set mes(novoMes){
        this.#mes = novoMes;
    }

    get ano(){
        return this.#ano;
    }

    set ano(novoAno){
        this.#ano = novoAno;
    }


    async gravar(){
        const dao = new EventosDAO();
        await dao.gravar(this);
    }

    async atualizar(){
        const dao = new EventosDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventosDAO();
        await dao.excluir(this);
    }

    consultar(termoDePesquisa){
        const dao = new EventosDAO();
        return dao.consultar(termoDePesquisa);
    }

    toString(){
        return `Evento código: ${this.#id} - nome: ${this.#nome_evento}`;
    }


    toJSON(){
        return {
            "codigo": this.#id,
            "nome_evento": this.#nome_evento,
            "nome_artista": this.#nome_artista,
            "valores_ingresso": this.#valores_ingresso,
            "cidade_uf": this.#cidade_uf,
            "endereco_evento": this.#endereco_evento,
            "dia": this.#dia,
            "mes": this.#mes,
            "ano": this.#ano
        }
    }
}