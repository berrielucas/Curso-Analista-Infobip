// Pega o valor do atributo "RB_Url_Crm" e armazena na variável 'url_crm'
const url_crm = attributeApi.get('RB_Url_Crm');

// Pega o valor do atributo "RB_Id_Contato" e armazena na variável 'id_contato'
const id_contato = attributeApi.get('RB_Id_Contato');

// Cria o link completo do contato no CRM, juntando a URL base com a parte "contato/" e o ID do contato
// Ex.: https://meu-crm.apprubeus.com.br/contato/1234
const link_contato = url_crm + "contato/" + id_contato;

// Salva esse link completo no atributo "RB_Link_Contato_CRM"
attributeApi.set('RB_Link_Contato_CRM', link_contato);
