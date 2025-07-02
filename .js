// --- Declaração de Variáveis em JavaScript ---

// Variável constante: o valor NÃO pode ser alterado depois de atribuído
const nome = "Lucas"; 

// Variável mutável: o valor PODE ser alterado durante o código
let idade = 20; 

// --- Tipos de Dados Básicos ---

const texto = "Esse é um texto"; // String: sequência de caracteres/texto
const numero = 20;               // Number: valores numéricos (inteiros, decimais)
const lista = ["Item_01", "Item_02"]; // Array: lista ordenada de itens
const json = {                   // Objeto: conjunto de pares chave-valor (atenção, chaves devem ser únicas)
    chave1: "valor_01",
    chave2: "valor_02"
};
const booleano = true;           // Booleano: pode ser true (verdadeiro) ou false (falso)

// --- Trabalhando com atributos usando attributeApi ---

// Para pegar (ler) o valor de um atributo pelo nome
let variavel1 = attributeApi.get("nome_do_atributo");

// Para mudar (definir) o valor de um atributo pelo nome
attributeApi.set("nome_do_atributo", "valor_do_atributo");

// --- Observações importantes ---

// 1. Constantes (const) são usadas quando o valor nunca deve mudar, por exemplo, nomes fixos, URLs, etc.
// 2. Variáveis (let) são usadas quando o valor pode mudar, como contadores, respostas de usuários, etc.
// 3. Arrays e objetos são estruturas para guardar múltiplos dados relacionados de forma organizada.
// 4. attributeApi é uma interface para guardar e recuperar dados durante o fluxo do bot, funcionando como um "armário" para salvar informações temporárias.

// --- Exemplo prático ---

// Suponha que queremos guardar o nome de um usuário no atributo "Nome_Usuario":
const nomeUsuario = "Ana Clara";
attributeApi.set("Nome_Usuario", nomeUsuario);

// Depois, em outra parte do código, podemos recuperar esse nome para usar na conversa:
let nomeRecuperado = attributeApi.get("Nome_Usuario");
// Agora, 'nomeRecuperado' contém o valor "Ana Clara"

