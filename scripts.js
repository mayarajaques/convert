//cotação do dia
const USD = 5.78
const EUR = 6.30
const GBP = 7.50

//obtendo os elementos
const form = document.querySelector("form") // pegando o formulario
const amount = document.getElementById("amount") // pegando pelo id
const currency = document.getElementById("currency") // pegando pelo id
const footer = document.querySelector("main footer") // selecionando o footer dentro do main 
const description = document.getElementById("description") // pegando a span descrição do footer
const result = document.getElementById("result") // pegando o elemento h1 result

//observe o input
//manipulando o input amount para receber somente numeros
amount.addEventListener("input", () => {

  //criando a regex para eliminar letras
  const hasCharacterRegex = /\D+/g //verifica caracteres do tipo texto
  amount.value = amount.value.replace(hasCharacterRegex, "") //pegando as letras e substituindo por nada
})

//usando arrow fuction
//capturando o evento de submit(enviar) do formulario
form.onsubmit = (event) => {
  event.preventDefault() // tirando o comportamento padrão de recarregar do botão

  //pegando a moeda e passando como parametro para a função o valor, a moeda e o simbolo
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }

}

//Função para converter a moeda
//passa o valor que quer converter, o preço da moeda e o simbolo
function convertCurrency(amount, price, symbol) {
  try {
    // mudando a descrição do footer, conforme moeda
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}` // interpolação de string, colocando o simbolo da moeda "1 =" e o preço, passando no parametro

    //criando a variavel let para calcular a conversão
    let total = amount * price

    if (isNaN(total)) { // verifica se o total não é um numero, retorna mensagem
      return alert("Por favor, digite o valor corretamente para converter.") // alerta no navegador
    }

    total = formatCurrencyBRL(total).replace("R$", "") // usando a função de formatação para formatar em reais, tirando o 'R$'

    result.textContent = `${total} Reais` // exibindo o total no conteudo


    //aplica a classe que exibe o valor convertido
    footer.classList.add("show-result")

  } catch (error) {
    //remove a classe do footer, ocultando ele da tela
    footer.classList.remove("show-result")

    console.log(error) //exibir a mensagem de erro
    alert("Não foi possível converter, Tente novamente mais tarde.") //alerta no navegador

  }
}


// função para formatar para moeda brasileira
function formatCurrencyBRL(value) {
  // convertendo o valor para um number, porque se nao ele considera qualquer coisa
  return Number(value).toLocaleString("pt-BR", { // passando que quero formatar para uma moeda brasileira (R$ 0,00)
    style: "currency", //estilo moeda
    currency: "BRL" // tipo brasileira
  })
}

