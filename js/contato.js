/* Selecionando elementos a serem manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoTelefone = formulario.querySelector("#telefone");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const mensagem = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

/* Ativação das máscaras com jQuery Mask */
$(campoCep).mask("00000-000");
$(campoTelefone).mask("(00) 0000-0000");



/* Monitorando o evento de acionamento do botão localizar cep */
botaoLocalizar.addEventListener("click", function(event){
    event.preventDefault();

    // Pegar o cep digitado
    let cep = campoCep.value;

    /* "AJAX": técnica de comunicação assíncrona
    usando a API (Web Service) ViaCEP
    www.viacep.com.br */

    /* Etapa 1: preparar uma URL contendo o cep
    digitado e o caminho da API (ViaCEP) */
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Etapa 2: acesse e inicie uma comunicação/requisição
    com o servidor da URL indicada */
    fetch(url)

    /* Etapa 3: ... e então, recupere a resposta do servidor
    no formato de objeto (JSON). Este objeto contem todas
    as informações do endereço referente ao CEP informado. */
    .then( resposta => resposta.json() )
    
    /* Etapa 4: ... e então, extraia os dados da resposta
    e mostre na tela */
    .then( dados => {
        console.log(dados);

        // Se existir o indicador "erro" no objeto dados
        if( "erro" in dados ){
            // Apresentamos a mensagem abaixo
            mensagem.innerHTML = "CEP não encontrado!";
            mensagem.style.color = "red";
            campoCep.focus();
        } else {
            // Senão, o cep existe então mostramos:
            mensagem.innerHTML = "CEP encontrado!";
            mensagem.style.color = "blue";

            // Mostramos os dados nos campos
            campoEndereco.value = dados.logradouro;
            campoBairro.value = dados.bairro;
            campoCidade.value = dados.localidade;
            campoEstado.value = dados.uf;
        }

    } )
});
