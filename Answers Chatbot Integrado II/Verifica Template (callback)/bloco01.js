// Recupera os dados do atributo 'callbackData', que normalmente é uma string enviada pelo CRM no envio do template
// Exemplo de conteúdo esperado: "nome_do_template-id_contato-id__registro"
const callbackData = attributeApi.get('callbackData');

if (callbackData) {
    // Separa os dados da string usando o hífen ("-") como separador
    // A ideia aqui é extrair os primeiros 3 elementos da string (nome do template, ID do contato e ID do registro)
    // O restante (caso exista) será ignorado
    const [ nome_template, id_contato, id_registro, ...partialCallback ] = callbackData.split("-");
    
    // Se o nome do template existir, salva esse valor no atributo correspondente
    if (nome_template) attributeApi.set('RB_Nome_Template', nome_template);
    
    // Se o ID do contato existir, salva também em um atributo
    if (id_contato) attributeApi.set('RB_Id_Contato', id_contato);
    
    // Se o ID do registro existir, salva em um atributo para ser usado em outras etapas do fluxo
    if (id_registro) attributeApi.set('RB_Id_Registro', id_registro);
}

