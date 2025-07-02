// Pegamos o nome completo do contato que já foi salvo anteriormente no atributo "RB_Nome_Completo_Contato"
const nome_completo_contato = attributeApi.get("RB_Nome_Completo_Contato");

// Separarmos o nome completo em partes (dividindo pelos espaços) e pegamos apenas o primeiro nome
// Exemplo: "Ana Clara Silva" → "Ana"
const nome_contato = nome_completo_contato.split(" ")[0];

// Salvamos o primeiro nome em outro atributo, chamado "RB_Nome_Contato"
// Esse primeiro nome pode ser usado para tornar a conversa mais pessoal
attributeApi.set("RB_Nome_Contato", nome_contato);
