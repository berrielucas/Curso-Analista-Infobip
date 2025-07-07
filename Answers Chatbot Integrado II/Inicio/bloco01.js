<<<<<<< HEAD
// Parametrizações Rubeus
// Aqui definimos os "processos" que serão utilizados no fluxo da campanha.
// Cada processo representa uma etapa no CRM, como "Captação" ou "Qualificação de Leads".
// Esses dados são usados depois para montar mensagens, fluxos e filtros de campanha.

processos = [
    {
        // ID do processo no CRM Rubeus (você encontra esse número na URL ao acessar o processo no sistema)
        id: '1',

        // Nome amigável do processo. Aqui ele é usado apenas como referência interna na Infobip
        nome: 'Captação',

        // Prefixo identificador das campanhas relacionadas a esse processo
        // Ex: "captacao_mensagem_1", "captacao_followup", etc.
        tipo_campanha: 'captacao_'
    },
    {
        id: '2',
        nome: 'Qualificação de Leads',
        tipo_campanha: 'qualificacao_'
    }
];

// Salva essa lista de processos no atributo "RB_Processos"
// Assim, os dados ficam disponíveis para uso em outras etapas do fluxo (como decisões, filtros)
attributeApi.set('RB_Processos', processos);
=======
// Parametrizações Rubeus
// Aqui definimos os "processos" que serão utilizados no fluxo da campanha.
// Cada processo representa uma etapa no CRM, como "Captação" ou "Qualificação de Leads".
// Esses dados são usados depois para montar mensagens, fluxos e filtros de campanha.

processos = [
    {
        // ID do processo no CRM Rubeus (você encontra esse número na URL ao acessar o processo no sistema)
        id: '1',

        // Nome amigável do processo. Aqui ele é usado apenas como referência interna na Infobip
        nome: 'Captação',

        // Prefixo identificador das campanhas relacionadas a esse processo
        // Ex: "captacao_mensagem_1", "captacao_followup", etc.
        tipo_campanha: 'captacao_'
    },
    {
        id: '2',
        nome: 'Qualificação de Leads',
        tipo_campanha: 'qualificacao_'
    }
];

// Salva essa lista de processos no atributo "RB_Processos"
// Assim, os dados ficam disponíveis para uso em outras etapas do fluxo (como decisões, filtros)
attributeApi.set('RB_Processos', processos);
>>>>>>> cd301917a6f49db8ccaa2be34c24f1c8ec72159a
