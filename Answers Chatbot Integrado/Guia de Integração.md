# Guia de Integração: Chatbot Answers com CRM Rubeus

Este documento detalha os passos necessários para configurar a integração entre a plataforma de chatbot **Answers (Infobip)** e o **CRM Rubeus**. O objetivo é automatizar a captura, identificação e o direcionamento de contatos, garantindo que as interações sejam devidamente registradas no CRM.

## 1. Configuração no CRM Rubeus

As seguintes ações devem ser realizadas diretamente na plataforma Rubeus para preparar o ambiente para a integração.

#### Configuração do Canal de Comunicação
* **Criar Canal:** Registre um novo canal do tipo "Infobip" no CRM.
    * **Token:** Insira o token de acesso da API do Rubeus.
    * **Origem:** Defina um nome de origem para identificar os contatos criados via chatbot (ex: `INFOBIP_CHATBOT`).

#### Criação de Eventos
Crie os eventos que serão enviados pelo chatbot para rastrear a jornada do contato.
* `[Infobip] Cadastrado pelo Chatbot`: Disparado quando um novo contato é criado.
* `[Infobip] Criar Registro`: Disparado para registrar a necessidade ou interesse do contato.
* `[Infobip] Direcionado para o Atendimento Humano`: Disparado no momento do transbordo.

#### Criação de Campos Personalizados
* **`[Infobip] Necessidade Infobip`**: Campo do tipo texto para armazenar o motivo do contato do usuário (ex: "interesse em curso X", "suporte financeiro").

#### Criação do Fluxo de Automação
* **Desenvolver Fluxo:** Crie um fluxo de automação no Rubeus que utilize os eventos e campos personalizados acima para executar as ações desejadas (ex: atribuir o contato a um vendedor, enviar um e-mail de boas-vindas, etc.).

## 2. Configuração na Plataforma Answers

Crie os seguintes atributos no chatbot para armazenar as variáveis de configuração e os dados do usuário durante a conversa.

| Atributo | Tipo | Dado Sensível | Escopo | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `RB_Token` | Texto | Sim | Chatbot | Armazena o token da API do Rubeus para autenticação. |
| `RB_Origem` | Texto | Não | Chatbot | Armazena o ID da origem configurada no Rubeus. |
| `RB_Url_Crm` | URL | Não | Chatbot | URL base da API do Rubeus (ex: `https://seu_crm.rubeus.com.br/`). |
| `RB_Api_Sucesso` | Booleano | Não | Diálogo | Flag para verificar se uma chamada à API foi bem-sucedida (`true`/`false`). |
| `RB_Tipo_Evento_Cadastro` | Texto | Não | Chatbot | Armazena o ID do evento de cadastro no Rubeus. |
| `RB_Tipo_Evento_Cria_Registro` | Texto | Não | Chatbot | Armazena o ID do evento para criar um registro de interesse. |
| `RB_Tipo_Evento_Transbordo` | Texto | Não | Chatbot | Armazena o ID do evento de transbordo para atendimento humano. |
| `RB_Lista_Contatos` | Lista | Não | Chatbot | Armazena a lista de contatos retornada pela API do Rubeus. |
| `RB_Id_Contato` | Texto | Não | Chatbot | Armazena o ID do contato selecionado no Rubeus. |
| `RB_Dados_Contato` | JSON | Não | Chatbot | Armazena o objeto JSON completo com os dados do contato. |
| `RB_Nome_Contato` | Texto | Não | Chatbot | Armazena o primeiro nome do contato. |
| `RB_Nome_Completo_Contato` | Texto | Não | Chatbot | Armazena o nome completo do contato. |
| `RB_Email_Contato` | Texto | Não | Chatbot | Armazena o e-mail do contato. |
| `RB_Telefone_Contato` | Texto | Não | Chatbot | Armazena o telefone do contato. |
| `RB_Quantidade_Contatos` | Número | Não | Chatbot | Armazena a quantidade de contatos encontrados na busca. |
| `CHAT_Mensagem_Personalizada` | Texto | Não | Chatbot | Mensagem dinâmica a ser exibida para o usuário. |
| `CHAT_Resposta_Usuario` | Texto | Não | Chatbot | Armazena a resposta fornecida pelo usuário. |
| `CHAT_Resposta_Valida` | Booleano | Não | Chatbot | Flag para validar se a resposta do usuário atende ao formato esperado. |

## 3. Fluxo de Interação do Chatbot

A seguir, o fluxo lógico que o chatbot deve executar para interagir com o usuário e o CRM Rubeus.

1.  **Busca do Contato:** O chatbot pega o número de telefone da pessoa que está conversando com o bot no momento e realiza uma busca na API do Rubeus para verificar se o contato já existe.

2.  **Criação de Novo Contato:** Se nenhum contato for encontrado, o chatbot coleta os dados necessários (nome, etc.), cria um novo cadastro no Rubeus e dispara o evento **`[Infobip] Cadastrado pelo Chatbot`**.

3.  **Seleção de Contato (Múltiplos Registros):** Caso a busca retorne mais de um contato com o mesmo número de telefone, o chatbot apresenta uma lista para o usuário confirmar qual é o seu registro.

4.  **Identificação da Necessidade:** Após identificar ou criar o contato, o chatbot pergunta o motivo do contato (ex: "Sobre o que você gostaria de falar?").

5.  **Registro da Necessidade no CRM:** A resposta do usuário é salva no campo personalizado **`[Infobip] Necessidade Infobip`** no Rubeus através do disparo do evento **`[Infobip] Criar Registro`**.

6.  **Transbordo para Atendimento Humano:** Por fim, o chatbot dispara o evento **`[Infobip] Direcionado para o Atendimento Humano`**, finaliza a automação e informa ao usuário que ele será transferido para um atendente.