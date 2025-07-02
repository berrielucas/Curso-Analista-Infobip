// Pegamos a lista de contatos que foi retornada pela API do sistema Rubeus
const contatos = attributeApi.get("RB_Lista_Contatos");

// Pegamos a resposta que o usuário enviou no chat (esperamos que ele tenha digitado um número/código)
const resposta_usuario = attributeApi.get("CHAT_Resposta_Usuario");

if (contatos.length) {
    // Filtramos a lista para manter apenas os contatos principais
    // Isso serve para remover contatos duplicados ou mesclados no sistema
    const contatos_filtrados = contatos.filter(contato => contato.id === contato.contatoPrincipal);

    // Convertendo a resposta do usuário (string) para número
    const posicao = parseInt(resposta_usuario);

    // Verificamos se a posição informada é válida:
    // - Deve ser maior que zero
    // - Deve ser menor ou igual ao total de contatos disponíveis
    if (posicao <= contatos_filtrados.length && posicao > 0) {
        // Selecionamos o contato correspondente à posição digitada pelo usuário
        // Como os arrays começam do zero, subtraímos 1 para acessar o índice correto
        const dados_contato = contatos_filtrados[posicao - 1];

        // Extraímos os dados importantes do contato selecionado
        const id_contato = dados_contato.id;
        const nome_completo_contato = buscaNome(dados_contato); // Função que retorna o nome (prioriza nome social)
        const nome_contato = nome_completo_contato.split(" ")[0]; // Pega apenas o primeiro nome
        const email_contato = buscaEmail(dados_contato); // Função que busca o email principal, se existir

        // Armazenamos essas informações em variáveis/atributos para uso posterior no fluxo
        attributeApi.set("RB_Dados_Contato", dados_contato);
        attributeApi.set("RB_Id_Contato", id_contato);
        attributeApi.set("RB_Nome_Completo_Contato", nome_completo_contato);
        attributeApi.set("RB_Nome_Contato", nome_contato);
        attributeApi.set("RB_Email_Contato", email_contato);

        // Como a escolha foi válida, marcamos isso para o chatbot continuar o fluxo normalmente
        attributeApi.set("CHAT_Resposta_Valida", true);
    } else {
        // Se o número digitado não corresponde a nenhum contato da lista, marcamos como inválido
        attributeApi.set("CHAT_Resposta_Valida", false);
    }
} else {
    // Caso não haja contatos na lista, também marcamos a resposta como inválida
    attributeApi.set("CHAT_Resposta_Valida", false);
}

// Função que define qual nome será exibido para o contato
// Se houver um nome social cadastrado, ele será usado. Caso contrário, usa o nome comum
function buscaNome(dados_contato) {
    if (dados_contato.nomeSocial != null && dados_contato.nomeSocial != "") {
        return dados_contato.nomeSocial;
    }
    return dados_contato.nome;
}

// Função que tenta encontrar o e-mail principal do contato
// Se não encontrar, retorna "null" para indicar que o e-mail não está disponível
function buscaEmail(dados_contato) {
    if (dados_contato.emails) {
        if (dados_contato.emails.principal.email) {
            return dados_contato.emails.principal.email;
        }
        return null;
    }
    return null;
}
