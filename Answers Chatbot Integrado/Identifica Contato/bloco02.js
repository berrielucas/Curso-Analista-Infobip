// Recupera a lista de contatos que o sistema Rubeus retornou através da API
const contatos = attributeApi.get("RB_Lista_Contatos");

if (contatos?.length) {
    // Filtra a lista para manter apenas os contatos principais (exclui os contatos mesclados)
    const contatos_filtrados = contatos.filter(contato => contato.id === contato.contatoPrincipal);

    // Conta quantos contatos principais foram encontrados
    const quantidade = contatos_filtrados.length;
    attributeApi.set("RB_Quantidade_Contatos", quantidade);

    // Se foi encontrado exatamente 1 contato principal
    if (quantidade === 1) {
        // Pega esse único contato
        const dados_contato = contatos_filtrados[0];

        // Extrai informações importantes do contato
        const id_contato = dados_contato.id;
        const nome_completo_contato = buscaNome(dados_contato); // Função que define qual nome será exibido
        const nome_contato = nome_completo_contato.split(" ")[0]; // Pega apenas o primeiro nome
        const email_contato = buscaEmail(dados_contato); // Função que busca o email principal

        // Salva as informações extraídas em atributos para serem utilizados em outras etapas
        attributeApi.set("RB_Dados_Contato", dados_contato);
        attributeApi.set("RB_Id_Contato", id_contato);
        attributeApi.set("RB_Nome_Completo_Contato", nome_completo_contato);
        attributeApi.set("RB_Nome_Contato", nome_contato);
        attributeApi.set("RB_Email_Contato", email_contato);
    }
    // Se mais de um contato principal foi encontrado (por exemplo, várias pessoas com o mesmo número)
    else if (quantidade > 1) {
        // Monta uma lista personalizada com os dados dos contatos para o usuário escolher quem ele é
        const lista_personalizada = montaListaPersonalizada(contatos_filtrados);
        
        // Salva essa lista em um atributo para enviar ao usuário
        attributeApi.set("CHAT_Mensagem_Personalizada", lista_personalizada);
    }
}

// Função que retorna o nome que deve ser usado:
// - Dá preferência ao nome social (caso exista), senão retorna o nome padrão
function buscaNome(dados_contato) {
    if (dados_contato.nomeSocial != null && dados_contato.nomeSocial != "") {
        return dados_contato.nomeSocial;
    }
    return dados_contato.nome;
}

// Função que tenta encontrar o e-mail principal do contato
// Se não encontrar, retorna "null"
function buscaEmail(dados_contato) {
    if (dados_contato.emails) {
        if (dados_contato.emails.principal.email) {
            return dados_contato.emails.principal.email;
        }
        return null;
    }
    return null;
}

// Função que monta uma lista formatada com os contatos encontrados
// Essa lista será mostrada ao usuário para que ele identifique qual é o seu contato
function montaListaPersonalizada(lista_contato) {
    let lista_personalizada = "";
    for (var i = 0; i < lista_contato.length; i++) {
        lista_personalizada = lista_personalizada + criaDadosPersonalizadosDeContato(lista_contato[i], i + 1);
    }
    lista_personalizada = lista_personalizada + "*_Para continuar, por favor, confirme seu nome, informando o código_*";
    return lista_personalizada;
}

// Função que formata os dados de cada contato individualmente para exibir na lista personalizada
// Inclui um código identificador e o nome do contato
function criaDadosPersonalizadosDeContato(dados_contato, posicao) {
    if (dados_contato) {
        let codigo = `*Código:* _${posicao}_\n`;
        let nome = `*Nome:*  _${buscaNome(dados_contato)}_\n`;

        const contato = codigo + nome;

        return `${contato}\n`;
    }
    return "";
}
