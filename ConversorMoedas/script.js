const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select-value-convert")

let rates = {
  dolar: 0,
  euro: 0,
  bitcoin: 0,
  libra: 0,
  ethereum: 0
};

async function fetchRates() {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL");
    const data = await res.json();
    rates.dolar = Number(data.USDBRL.bid);
    rates.euro = Number(data.EURBRL.bid);
    rates.libra = Number(data.GBPBRL.bid);
    rates.bitcoin = Number(data.BTCBRL.bid);
  } catch (e) {
    alert("Erro ao buscar cotações em tempo real.");
  }
}

async function convertValues() {
  const inputCovertValue = document.querySelector(".input-currecy").value
  const currencyToConvert = document.querySelector(".currency-value-to-convert")
  const currecyConvertedValue = document.querySelector(".currency-value")

  // Atualiza as cotações antes de converter
  await fetchRates();

  currencyToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(inputCovertValue)

  if (currencySelect.value == "dolar") {
    currecyConvertedValue.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(inputCovertValue / rates.dolar)
  }
  if (currencySelect.value == "euro") {
    currecyConvertedValue.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(inputCovertValue / rates.euro)
  }
  if (currencySelect.value == "bitcoin") {
    currecyConvertedValue.innerHTML = (inputCovertValue / rates.bitcoin).toFixed(8) + " BTC";
  }
  if (currencySelect.value == "libra") {
    currecyConvertedValue.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP"
    }).format(inputCovertValue / rates.libra)
  }

  if (currencySelect.value == "ethereum") {
    currecyConvertedValue.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "UTC"
    }).format(inputCovertValue / rates.libra)
  }

}  
  function changeCurrency() {
    const currecyName = document.getElementById("currency-name")
    const currencyimg = document.querySelector(".currency-img")


    if (currencySelect.value == "dolar") {

      currecyName.innerHTML = "Dólar Americano"
      currencyimg.src = "./assets/img/dolar.png"
    }

    if (currencySelect.value == "euro") {

      currecyName.innerHTML = "Euro"
      currencyimg.src = "./assets/img/euro.png"

    }

    if (currencySelect.value == "bitcoin") {

      currecyName.innerHTML = "Bitcoin"
      currencyimg.src = "./assets/img/bitcoin.png"

    }

    if (currencySelect.value == "libra") {

      currecyName.innerHTML = "libra"
      currencyimg.src = "./assets/img/libra.png"

    }

    if (currencySelect.value == "ethereum") {

      currecyName.innerHTML = "Ethereum"
      currencyimg.src = "./assets/img/ethereum.png"

    }
    convertValues()
  

}
  console.log(changeCurrency)


  currencySelect.addEventListener("change", changeCurrency)
  convertButton.addEventListener("click", convertValues)
