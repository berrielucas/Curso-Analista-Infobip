// Recupera a lista de processos que foi salva anteriormente no atributo 'RB_Processos'
// Essa lista contém objetos com informações sobre cada processo, como id, nome e tipo de campanha
const lista_processos = attributeApi.get('RB_Processos');

// Verifica se a lista existe e tem pelo menos um processo dentro
if (lista_processos?.length) {
    // Filtra a lista para pegar apenas os processos que têm o tipo de campanha 'qualificacao_'
    // Depois, pega só os IDs desses processos filtrados para montar uma lista de IDs
    const ids_processo = 
        lista_processos
            .filter(processo => processo.tipo_campanha === 'qualificacao_')
            .map(processo => processo.id);
    
    // Salva a lista de IDs dos processos filtrados no atributo 'RB_Processos_Identificados'
    // Isso é usado na Identificação do registro do contato
    attributeApi.set('RB_Processos_Identificados', ids_processo);
}
