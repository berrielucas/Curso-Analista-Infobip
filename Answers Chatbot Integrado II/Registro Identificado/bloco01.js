<<<<<<< HEAD
// Recupera os dados do registro que foram salvos anteriormente em um atributo
// Esse dado normalmente foi extraído de um registro filtrado em etapas anteriores do fluxo
const registro_dados = attributeApi.get('RB_Dados_Registro');

// Verifica se existe algum dado no registro recuperado
// O operador ?.length garante que só vai tentar acessar o length se 'registro_dados' não for null ou undefined
if (registro_dados) {
    // Se o registro existe, chama a função que vai salvar os dados detalhados dele em outros atributos
    setAtributosRegistro(registro_dados);
}

// Função responsável por salvar as informações mais importantes do registro
// Essas informações serão utilizadas em outras partes do fluxo, como mensagens, condições e relatórios
function setAtributosRegistro(dados) {
    // Salva o ID do curso relacionado a esse registro
    attributeApi.set('RB_Id_Curso_Registro', dados.curso);

    // Salva o nome do processo (ex: Captação, Qualificação, etc.)
    attributeApi.set('RB_Processo_Registro', dados.processoNome);

    // Salva a razão da oportunidade (ou resumo do interesse)
    attributeApi.set('RB_Resumo_Registro', dados.razaoOportunidadeNome);

    // Salva a etapa em que o registro está no funil (ex: Interessado, Inscrito, etc.)
    attributeApi.set('RB_Etapa_Registro', dados.etapaNome);

    // Salva o status atual do registro (ex: Em andamento, Ganho, Perdido)
    attributeApi.set('RB_Status_Registro', dados.statusNome);

    // Salva o nome do responsável por esse registro (normalmente, um atendente ou vendedor)
    attributeApi.set('RB_Responsavel_Registro', dados.responsavelNome);    
}
=======
// Recupera os dados do registro que foram salvos anteriormente em um atributo
// Esse dado normalmente foi extraído de um registro filtrado em etapas anteriores do fluxo
const registro_dados = attributeApi.get('RB_Dados_Registro');

// Verifica se existe algum dado no registro recuperado
// O operador ?.length garante que só vai tentar acessar o length se 'registro_dados' não for null ou undefined
if (registro_dados?.length) {
    // Se o registro existe, chama a função que vai salvar os dados detalhados dele em outros atributos
    setAtributosRegistro(dados);
}

// Função responsável por salvar as informações mais importantes do registro
// Essas informações serão utilizadas em outras partes do fluxo, como mensagens, condições e relatórios
function setAtributosRegistro(dados) {
    // Salva o ID do curso relacionado a esse registro
    attributeApi.set('RB_Id_Curso_Registro', dados.curso);

    // Salva o nome do processo (ex: Captação, Qualificação, etc.)
    attributeApi.set('RB_Processo_Registro', dados.processoNome);

    // Salva a razão da oportunidade (ou resumo do interesse)
    attributeApi.set('RB_Resumo_Registro', dados.razaoOportunidadeNome);

    // Salva a etapa em que o registro está no funil (ex: Interessado, Inscrito, etc.)
    attributeApi.set('RB_Etapa_Registro', dados.etapaNome);

    // Salva o status atual do registro (ex: Em andamento, Ganho, Perdido)
    attributeApi.set('RB_Status_Registro', dados.statusNome);

    // Salva o nome do responsável por esse registro (normalmente, um atendente ou vendedor)
    attributeApi.set('RB_Responsavel_Registro', dados.responsavelNome);    
}
>>>>>>> cd301917a6f49db8ccaa2be34c24f1c8ec72159a
