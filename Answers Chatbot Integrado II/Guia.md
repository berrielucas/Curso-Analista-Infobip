# Atributos Adicionais para Integração com o CRM Rubeus

Este documento complementa o guia anterior, detalhando novos atributos que devem ser criados na plataforma **Answers (Infobip)** para ampliar a integração com o **CRM Rubeus**. Esses atributos possibilitam a leitura, tratamento e apresentação de registros vinculados a contatos, como inscrições em processos seletivos, status de atendimento, responsáveis, entre outros dados relevantes.

## Atributos a serem Criados

Crie os seguintes atributos no chatbot para armazenar as variáveis de configuração e os dados do usuário durante a conversa.

| Atributo                   | Tipo   | Dado Sensível | Escopo   | Descrição                                                                 | Disponíveis para os agentes |
|---------------------------|--------|----------------|----------|---------------------------------------------------------------------------|-----------------------------|
| `RB_Nome_Template`        | Texto  | Não            | Chatbot  | Armazena o nome do template enviado.              | Sim                         |
| `RB_Processos`            | Lista  | Não            | Chatbot  | Lista de processos disponíveis.               | Não                         |
| `RB_Processos_Identificados` | Lista  | Não        | Chatbot  | Lista de ids dos processos filtrados de acordo com a campanha. | Não                   |
| `RB_Lista_Registros`      | Lista  | Não            | Chatbot  | Armazena os registros retornados da API do Rubeus.                        | Não                         |
| `RB_Range_Tempo_Criacao`  | Texto  | Não            | Chatbot  | Indica o intervalo de tempo (em mêses) para filtrar registros pela data de criação. | Não                         |
| `RB_Quantidade_Registros` | Número | Não            | Chatbot  | Quantidade total de registros encontrados.                                | Não                         |
| `RB_Id_Registro`          | Texto  | Não            | Chatbot  | ID único do registro selecionado no CRM.                                  | Não                         |
| `RB_Dados_Registro`       | JSON   | Não            | Chatbot  | Objeto completo com os dados detalhados do registro.                      | Não                         |
| `RB_Etapa_Registro`       | Texto  | Não            | Chatbot  | Etapa atual do processo em que o registro se encontra.                    | Sim                         |
| `RB_Responsavel_Registro` | Texto  | Não            | Chatbot  | Nome do responsável pelo acompanhamento do registro.                      | Sim                         |
| `RB_Processo_Registro`    | Texto  | Não            | Chatbot  | Nome do processo associado ao registro.                                   | Sim                         |
| `RB_Resumo_Registro`      | Texto  | Não            | Chatbot  | Resumo ou descrição da situação do registro.                              | Sim                         |
| `RB_Curso_Registro`       | Texto  | Não            | Chatbot  | Nome do curso vinculado ao registro.                                      | Sim                         |
| `RB_Id_Curso_Registro`    | Texto  | Não            | Chatbot  | ID do curso associado ao registro.                                        | Não                         |
| `RB_Status_Registro`      | Texto  | Não            | Chatbot  | Status atual do registro (ex: Em andamento, Concluído, Cancelado).        | Sim                         |


