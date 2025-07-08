// Recupera a lista de processos que foi salva anteriormente no atributo 'RB_Processos'
// Essa lista contém objetos com informações de cada processo, como id, nome e tipo de campanha
const lista_processos = attributeApi.get('RB_Processos');

// Verifica se a lista existe e tem pelo menos um processo dentro
if (lista_processos?.length) {
    // Cria uma nova lista contendo somente os IDs de cada processo
    const ids_processo = lista_processos.map(processo => processo.id);
    
    // Salva a lista de IDs dos processos filtrados no atributo 'RB_Processos_Identificados'
    // Isso é usado na Identificação do registro do contato
    attributeApi.set('RB_Processos_Identificados', ids_processo);
}
