const endpoint = "https://v6.exchangerate-api.com/v6/";
const apiKey = "889e6c4e15fa4f704249376a/";
const codesUrl = "codes/";
const ratesUrl = "latest/BYN";

const codesRequest = fetch(`${endpoint}${apiKey}${codesUrl}`);
const ratesRequest = fetch(`${endpoint}${apiKey}${ratesUrl}`);

Promise.all([codesRequest, ratesRequest])
  .then(([codesData, ratesData]) =>
    Promise.all([codesData.json(), ratesData.json()])
  )
  .then(([сurrenciesData, ratesData]) => {
    const conversion_rates = ratesData.conversion_rates;
    const сurrencies = сurrenciesData.supported_codes.reduce(
      (сurrencies, [сurrencyCode, сurrencyName]) => {
        сurrencies[сurrencyCode] = сurrencyName;
        return сurrencies;
      },
      {}
    );
    addExchangeRatesElement(
      createExchangeRatesElement(сurrencies, conversion_rates)
    );
  });

function createExchangeRatesElement(сurrencies, conversion_rates) {
  let exchangeRatesElement = "";
  for (let сurrencyCode in conversion_rates) {
    exchangeRatesElement += `
    <div class="name cell">${сurrencies[сurrencyCode]}</div>
    <div class="abbreviation cell">${сurrencyCode}</div>
    <div class="rate cell">${conversion_rates[сurrencyCode]}</div>`;
  }
  return exchangeRatesElement;
}

function addExchangeRatesElement(ratesElement) {
  document.getElementById("rates").innerHTML += ratesElement;
}
