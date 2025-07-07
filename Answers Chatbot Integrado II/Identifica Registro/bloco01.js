// Recupera a lista de registros retornada pela API do sistema Rubeus
const registros = attributeApi.get('RB_Lista_Registros');

// Recupera o número de meses que será considerado para filtrar registros mais antigos
const range_tempo_criacao = attributeApi.get("RB_Range_Tempo_Criacao");

// Recupera os processos que devem ser levados em consideração na filtragem
const processos_identificados = attributeApi.get("RB_Processos_Identificados");

// Define os status que indicam que um registro deve ser desconsiderado
const excluir_registro_por_status = ["Ganho", "Perdido"];


// Filtra os registros com base nos seguintes critérios:
// 1. O processo do registro precisa estar na lista de processos válidos
// 2. O registro deve ter sido criado dentro do intervalo de meses permitido
// 3. O status do registro não pode estar na lista de exclusão (ex: "Ganho", "Perdido")
// Se não houver registros, o resultado da filtragem será null
const registros_filtrados = registros !== null 
    ? registros.filter(r => 
        processos_identificados.includes(r.processo) &&
        diferencaEmMeses(r.momento) <= range_tempo_criacao &&
        verificaStatusRegistro(r)
    )
    : null;


// Conta quantos registros foram encontrados após aplicar os filtros
const quantidade_registros = registros_filtrados.length;

// Salva essa quantidade em um atributo para ser utilizada em outras etapas do fluxo
attributeApi.set('RB_Quantidade_Registros', quantidade_registros);

// Se houver pelo menos 1 registro válido após os filtros
if (quantidade_registros > 0) {
    // Recupera o registro mais recente com base na data de criação
    const ultimo_registro = pegaUltimoRegistro(registros_filtrados);

    // Monta o nome completo do curso (curso + modalidade + local de oferta)
    const curso = pegaNomeCurso(ultimo_registro);

    // Salva os dados importantes do último registro encontrado
    attributeApi.set('RB_Dados_Registro', ultimo_registro);
    attributeApi.set('RB_Id_Registro', ultimo_registro.id);
    attributeApi.set('RB_Curso_Registro', curso);
}

// Função que monta o nome completo do curso associado ao registro:
// - Junta o nome do curso com a modalidade (ex: presencial, EAD) e o local de oferta
function pegaNomeCurso(registro) {
    let curso_nome = null;

    if (registro.cursoNome) {
        curso_nome += registro.cursoNome;
    }

    if (registro.modalidadeNome) {
        curso_nome += ` - ${registro.modalidadeNome}`;
    }

    if (registro.localOfertaNome) {
        curso_nome += ` - ${registro.localOfertaNome}`;
    }

    return curso_nome;
}

// Função que retorna o registro mais recente da lista, com base na data de criação
function pegaUltimoRegistro(registros) {
    if (registros?.length) {
        // Ordena os registros do mais recente para o mais antigo, usando a data
        const listOrdenada = registros.sort((a, b) => new Date(b.momento) - new Date(a.momento));
        // Retorna o primeiro da lista (ou seja, o mais recente)
        return listOrdenada[0];
    }
    // Se a lista for nula, retorna null
    return null;
}

// Função que calcula quantos meses se passaram entre a data fornecida e a data atual
function diferencaEmMeses(dataAnteriorString) {
    const dataAnterior = new Date(dataAnteriorString);
    const dataAtual = new Date();

    const dataAnteriorEmMilisegundos = dataAnterior.getTime();
    const dataAtualEmMilisegundos = dataAtual.getTime();

    const diferencaEmMilisegundos = dataAtualEmMilisegundos - dataAnteriorEmMilisegundos;
    const diferencaEmDias = diferencaEmMilisegundos / (1000 * 60 * 60 * 24);

    // Usa um valor médio de dias por mês para fazer a conversão
    const diferencaEmMeses = diferencaEmDias / 30.4375;

    return Math.floor(diferencaEmMeses);
}

// Função que verifica se o status do registro deve ser excluído
// Retorna TRUE se o status for permitido, FALSE se for um status a ser ignorado
function verificaStatusRegistro(registro) {
    if (registro.statusNome) {
        // Verifica se o nome do status contém algum dos status indesejados (como "Ganho" ou "Perdido")
        return !excluir_registro_por_status.some(key => 
            registro.statusNome.toLowerCase().includes(key.toLowerCase())
        );
    }

    // Se o registro não tiver status, consideramos ele inválido
    return false;
}
