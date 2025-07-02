# Guia Completo de Variáveis, JSON e `attributeApi` para Iniciantes

Olá! 👋 Bem-vindo a este guia prático. Se você está começando a programar ou trabalhando com bots e precisa entender como guardar e manipular informações, você veio ao lugar certo!

Vamos explorar juntos os conceitos essenciais de **variáveis** e **tipos de dados** em JavaScript, mergulhar no mundo do **JSON** e aprender a usar a `attributeApi` para salvar e recuperar dados de forma eficiente.

## 1. Variáveis: Onde Guardamos Nossos Dados

Imagine que você precisa guardar uma informação, como o nome de um usuário ou o preço de um produto. Em programação, usamos **variáveis** para isso. Pense nelas como "caixas" com etiquetas, onde cada caixa guarda um valor e a etiqueta é o nome que damos a ela.

Em JavaScript moderno, usamos principalmente `let` e `const` para criar essas "caixas".

### `const` vs `let`: Qual devo usar?

A escolha entre `const` e `let` depende de uma única pergunta: **o valor desta variável vai mudar?**

-   `const` (constante): Use quando o valor **não pode** ser alterado depois de definido. É a escolha mais segura e recomendada na maioria dos casos.
-   `let` (variável): Use quando você **precisa** alterar o valor da variável em algum momento.

**Tabela Comparativa:**

| Característica | `let` | `const` |
| :--- | :--- | :--- |
| **Pode ser reatribuído?** | ✅ Sim | ❌ Não |
| **Uso principal** | Para valores que precisam mudar (ex: um contador). | Para valores que não devem mudar (ex: nome de um usuário, configurações). |

**Exemplos Práticos:**

```javascript
// Usando 'let' para um valor que pode mudar
let pontuacao = 10;
console.log("Pontuação inicial:", pontuacao); // Saída: Pontuação inicial: 10

pontuacao = 15; // O valor foi alterado com sucesso!
console.log("Nova pontuação:", pontuacao); // Saída: Nova pontuação: 15

// Usando 'const' para um valor que não muda
const nomeUsuario = "Ana";
console.log("Bem-vinda,", nomeUsuario); // Saída: Bem-vinda, Ana

// Se tentarmos alterar uma 'const', receberemos um erro!
// nomeUsuario = "Joana"; // TypeError: Assignment to constant variable.
```

## 2. Tipos de Dados: Os Diferentes Formatos da Informação

As variáveis podem guardar diferentes tipos de informação. Conhecer os principais tipos de dados é fundamental.

| Tipo de Dado | Descrição | Exemplo em JavaScript |
| :--- | :--- | :--- |
| **String** | Texto simples. Sempre entre aspas (`""` ou `''`). | `const saudacao = "Olá, mundo!";` |
| **Number** | Números, sejam inteiros ou com casas decimais. | `const idade = 29; const preco = 49.90;` |
| **Boolean** | Representa um valor lógico: verdadeiro (`true`) ou falso (`false`). | `const usuarioAtivo = true;` |
| **Array** | Uma lista ordenada de valores. Útil para guardar múltiplos itens. | `const listaDeCompras = ["leite", "pão", "ovos"];` |
| **Object** | Uma coleção de dados no formato `chave: valor`. Perfeito para representar entidades complexas. O formato **JSON** é a forma mais comum de escrever objetos. | `const produto = { nome: "Notebook", preco: 3500 };` |

## 3. JSON: A Linguagem Universal dos Dados

**JSON** (JavaScript Object Notation) é um formato leve e de fácil leitura para estruturar, guardar e transportar dados. Embora tenha "JavaScript" no nome, ele é um padrão universal usado em praticamente todas as linguagens de programação.

Sua estrutura é baseada em **pares de chave-valor**.

-   **Chave (Key):** É sempre um texto (string) que funciona como o nome ou identificador do dado.
-   **Valor (Value):** Pode ser qualquer tipo de dado: uma string, um número, um booleano, um array ou até mesmo outro objeto JSON.

### Exemplo de um JSON na prática

Vamos ver um exemplo de um objeto JSON que representa um perfil de usuário:

```javascript
// Este é um objeto JSON que representa um usuário
const perfilUsuario = {
  "id": 101,
  "nome": "Carlos Silva",
  "email": "carlos.silva@exemplo.com",
  "ativo": true,
  "interesses": ["tecnologia", "viagens", "fotografia"],
  "endereco": {
    "rua": "Rua das Flores",
    "numero": 123,
    "cidade": "São Paulo"
  }
};
```

### Acessando e Modificando Dados em um JSON

Você pode acessar e alterar os dados de um objeto JSON de forma muito simples em JavaScript.

```javascript
// Acessando dados com a notação de ponto (.)
console.log(perfilUsuario.nome); // Saída: "Carlos Silva"
console.log(perfilUsuario.interesses[0]); // Saída: "tecnologia" (acessando o primeiro item do array)
console.log(perfilUsuario.endereco.cidade); // Saída: "São Paulo" (acessando um dado de um objeto aninhado)

// Alterando um valor existente
perfilUsuario.ativo = false;
console.log(perfilUsuario.ativo); // Saída: false

// Adicionando um novo par chave-valor
perfilUsuario.telefone = "11987654321";
console.log(perfilUsuario.telefone); // Saída: "11987654321"
```

## 4. Salvando e Recuperando Dados com a `attributeApi`

Na plataforma Infobip, a `attributeApi` é a ferramenta que funciona como a "memória" do seu bot. Ela permite guardar informações sobre um usuário durante a conversa e recuperá-las quando necessário.

### Salvando Dados com `attributeApi.set(chave, valor)`

O método `set` guarda um valor. Ele precisa de dois argumentos:
1.  `chave`: O nome (uma string) que você usará para identificar o dado.
2.  `valor`: O dado que você quer guardar (pode ser qualquer tipo de dado).

```javascript
// Exemplo: salvando o nome do usuário
const nomeDoUsuario = "Beatriz";
attributeApi.set("nomeUsuario", nomeDoUsuario);

// Exemplo: salvando o objeto JSON inteiro do perfil do usuário
attributeApi.set("perfilCompleto", perfilUsuario);

// Exemplo: salvando um estado simples
attributeApi.set("fezLogin", true);
```

### Recuperando Dados com `attributeApi.get(chave)`

O método `get` busca um valor que foi salvo anteriormente. Você só precisa passar a `chave` que usou para salvar.

```javascript
// Recuperando o nome do usuário que salvamos
const nomeSalvo = attributeApi.get("nomeUsuario");
console.log("O nome salvo é:", nomeSalvo); // Saída: O nome salvo é: Beatriz

// Recuperando o objeto de perfil
const perfilSalvo = attributeApi.get("perfilCompleto");

// Agora podemos usar os dados do objeto recuperado
if (perfilSalvo) {
  console.log("Email do usuário salvo:", perfilSalvo.email); // Saída: Email do usuário salvo: carlos.silva@exemplo.com
}
```

## 5. Dicas Importantes e Boas Práticas

Para escrever um código mais limpo, seguro e eficiente, siga estas dicas:

1.  **Use Nomes de Variáveis Claros**: Prefira `nomeCliente` em vez de `nc`. Um código claro é mais fácil de entender e dar manutenção.

2.  **Prefira `const` Sempre que Possível**: Comece declarando suas variáveis com `const`. Mude para `let` apenas se tiver certeza de que o valor precisará ser reatribuído. Isso evita bugs por alterações acidentais.

3.  **Verifique Antes de Usar**: Ao recuperar um dado com `attributeApi.get()`, ele pode não existir (retornando `null` ou `undefined`). Sempre verifique se o dado existe antes de tentar usá-lo.
    ```javascript
    // Define um valor padrão ("visitante") caso o atributo não exista
    const nome = attributeApi.get("nomeUsuario") || "visitante";
    console.log(`Olá, ${nome}!`);
    ```

4.  **Mantenha a Estrutura dos seus JSONs**: Se você salva um atributo como um objeto JSON, tente manter sempre a mesma estrutura (as mesmas chaves). Isso torna seu código mais previsível e menos propenso a erros.

## Conclusão

Parabéns! Você aprendeu os fundamentos de como as informações são estruturadas e gerenciadas em JavaScript. Agora você entende:

-   A diferença entre `const` e `let`.
-   Os principais tipos de dados.
-   O que é JSON e como manipulá-lo.
-   Como usar a `attributeApi` para dar "memória" às suas aplicações.

Continue praticando e explorando. A programação é uma jornada de aprendizado contínuo, e dominar esses conceitos básicos é o primeiro grande passo para construir coisas incríveis!
