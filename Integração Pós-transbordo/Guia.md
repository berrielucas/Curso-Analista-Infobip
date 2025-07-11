### **Nota Importante:**
Os itens entre chaves `{}` são **placeholders**. Substitua-os pelos valores correspondentes da sua conta Rubeus ou Infobip (Ex: `{Token do seu CRM}`, `{ID do Tipo de Evento}`, etc.).

# Guia Integração Pós-transbordo

## Parametrização Rubeus

### Tipos de Evento
* `[Infobip] Atualização de Conversa`
* `[Infobip] Atualização de Consultor`
* `[Infobip] Atualização de Resumo`
> *Obs: Anote os IDs gerados pelo Rubeus para cada Tipo de Evento. Eles serão usados nas automações.*

### Propriedades (Campos personalizados)

| Nome | Tipo | Local | Multivalorado | Opções pré-definidas |
| :--- | :--- | :--- | :--- | :--- |
| `[Infobip] Consultor` | Texto | Contato | Não | N/A |
| `[Infobip] Resumo` | Texto | Registro | Não | N/A |
> *Obs: Anote o "Identificador interno" das propriedades para usar na automação.*

### Resumos

| Nome | Tipo | Processos |
| :--- | :--- | :--- |
| `Tem interesse` | Registro | Todos |
| `Não tem interesse` | Registro | Todos |

## Parametrizações Infobip (People e Conversation)

### Atributos Personalizados de Pessoa

| Nome | Tipo |
| :--- | :--- |
| `{seu nome} Link_Contato_CRM` | Texto |
| `{seu nome} Identificador do Curso` | Texto |
| `{seu nome} Identificador do Registro` | Texto |
| `{seu nome} Responsável Rubeus` | Texto |

### Formulário de Conversa - Campos de Entrada

| Nome | Tipo | Opções |
| :--- | :--- | :--- |
| `{seu nome} - Resumo` | Menu | `Tem interesse`, `Não tem interesse` |

### Formulário de Conversa - Formulários

* `{seu nome} - Alterar Resumo Rubeus`, com os seguintes campos:

| Nome | Obrigatório |
| :--- | :--- |
| `{seu nome} - Resumo` | Opcional |

## Automações (Fluxo de Trabalho baseado em Eventos)

### `{seu nome} - Mensagem recebida do cliente`

#### Acionadores
* Mensagem de Entrada Recebida

#### Ações
* **Chamar API**
    * **Método:** `POST`
    * **URL:** `{URL base do seu CRM}api/Evento/cadastro` (Ex: `https://meu-crm.apprubeus.com.br/api/Evento/cadastro`)
    * **Tipo de Conteúdo:** `JSON (application/json)`
    * **Corpo:**
        ```json
        {
            "tipo": "{ID do Tipo de Evento - Atualização de Conversa}",
            "pessoa": {
                "id": "{{customer.externalPersonId}}"
            },
            "descricao": "<strong>{{customer.firstName}}:</strong> {{content}} <br> <a href=\"[https://portal.infobip.com/conversations/my-work?conversationId=](https://portal.infobip.com/conversations/my-work?conversationId=){{conversation.id}}\" >Ver toda conversa</a>",
            "token": "{Token do seu CRM}",
            "origem": "{Origem do seu CRM}"
        }
        ```

### `{seu nome} - Mensagem enviada pelo agente`

#### Acionadores
* Mensagem de saída enviada pelo agente

#### Ações
* **Chamar API**
    * **Método:** `POST`
    * **URL:** `{URL base do seu CRM}api/Evento/cadastro` (Ex: `https://meu-crm.apprubeus.com.br/api/Evento/cadastro`)
    * **Tipo de Conteúdo:** `JSON (application/json)`
    * **Corpo:**
        ```json
        {
            "tipo": "{ID do Tipo de Evento - Atualização de Conversa}",
            "pessoa": {
                "id": "{{customer.externalPersonId}}"
            },
            "descricao": "<strong>{{agent.displayName}}:</strong> {{content}} <br> <a href=\"[https://portal.infobip.com/conversations/my-work?conversationId=](https://portal.infobip.com/conversations/my-work?conversationId=){{conversation.id}}\" >Ver toda conversa</a>",
            "token": "{Token do seu CRM}",
            "origem": "{Origem do seu CRM}"
        }
        ```

### `{seu nome} - Atualização de Resumo Rubeus`

#### Acionadores
* Campo do formulário atualizado

#### Condições
* Campo: `{seu nome} - Resumo` > `Está na Lista` > `[x] Tem interesse` e `[x] Não tem interesse`

#### Ações
* **Chamar API**
    * **Método:** `POST`
    * **URL:** `{URL base do seu CRM}api/Evento/cadastro` (Ex: `https://meu-crm.apprubeus.com.br/api/Evento/cadastro`)
    * **Tipo de Conteúdo:** `JSON (application/json)`
    * **Corpo:**
        ```json
        {
            "tipo": "{ID do Tipo de Evento - Atualização de Resumo}",
            "pessoa": {
                "id": "{{customer.externalPersonId}}"
            },
            "descricao": "Alterando resumo",
            "camposPersonalizados": {
                "{Identificador interno da propriedade no Rubeus - [Infobip] Resumo}": "{{field.Resumo}}"
            },
            "curso": "{{customer.data.berriel Identificador do Curso}}",
            "token": "{Token do seu CRM}",
            "origem": "{Origem do seu CRM}"
        }
        ```



Para a atualização de consultor, vamos adicionar mais uma ação em uma automação já existente `{seu nome} Saudação Inicial`.

**1. Localize a Automação**
   * Acesse a sua automação existente chamada **`{Seu Nome} Saudação Inicial`**.

**2. Adicione a Nova Ação**

* **Chamar API**
    * **Método:** `POST`
    * **URL:** `{URL base do seu CRM}api/Evento/cadastro` (Ex: `https://meu-crm.apprubeus.com.br/api/Evento/cadastro`)
    * **Tipo de Conteúdo:** `JSON (application/json)`
    * **Corpo:**
        ```json
        {
            "tipo": "{ID do Tipo de Evento - Atualização de Consultor}",
            "pessoa": {
                "id": "{{customer.externalPersonId}}"
            },
            "descricao": "Alterando responsável",
            "camposPersonalizados": {
                "{Identificador interno da propriedade no Rubeus - [Infobip] Consultor}": "{{agent.displayName}}"
            },
            "curso": "{{customer.data.berriel Identificador do Curso}}",
            "token": "{Token do seu CRM}",
            "origem": "{Origem do seu CRM}"
        }
        ```
