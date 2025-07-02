// Pegamos o número de telefone da pessoa que está conversando com o bot no momento
let telefone = attributeApi.get("phoneNumber");

// Limpamos o número de telefone, removendo parênteses, traços e espaços
// Isso deixa o número apenas com os dígitos (por exemplo: (11) 91234-5678 → 11912345678)
telefone = telefone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '');

// Guardamos o número de telefone limpo em um atributo chamado "RB_Telefone_Contato"
// Esse dado pode ser usado em etapas futuras da conversa
attributeApi.set("RB_Telefone_Contato", telefone);
