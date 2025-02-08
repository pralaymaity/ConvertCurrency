//console.log(countryList);

const baseURL =
  "https://v6.exchangerate-api.com/v6/8261db688a15107471ba2bf7/latest/";

let dropdown = document.querySelectorAll(".dropdown select");
let button = document.querySelector("form button");

let toCurrency = null;
let fromCurrency = null;
let currencyAmount = 1;
let storeCurrency = null;

(async function () {
  for (let select of dropdown) {
    // for of loop use for every element in select tag
    console.log(select);

    for (let countryCode in countryList) {
      // (countryList comes from nation.js file globally)
      let newOption = document.createElement("option");

      let countryCurrency = countryList[countryCode];
      newOption.innerText = countryCurrency;
      newOption.value = countryCode;

      //console.log(newOption);

      if (select.name === "from" && countryCode === "US") {
        newOption.selected = "selected";
        fromCurrency = countryCurrency;
        await getCurrency(countryCurrency);
      } else if (select.name === "to" && countryCode === "IN") {
        newOption.selected = "selected";
        toCurrency = countryCurrency;
        setCurrency();
      }
      select.append(newOption); // just append into select tag in both position
      //console.log(select);
    }
    //console.log(select);
    flagChange(select);

    select.addEventListener("change", async function (evt) {
      //console.log(evt);
      //console.log(evt.target);
      flagChange(evt.target);

      if (select.name === "from") {
        fromCurrency = countryList[evt.target.value];
        //console.log(fromCurrency);
        await getCurrency(fromCurrency);
      } else if (select.name === "to") {
        toCurrency = countryList[evt.target.value];
        //console.log(toCurrency);
      }
      setCurrency();
      //event.target provides a reference to the element
      // that can be modified
    });
  }
})();

function flagChange(element) {
  //console.log(element);

  let countryCode = element.value;
  //console.log(countryCode);

  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSource;
}

function setCurrency() {
  let currencyMessage = document.querySelector(".message");

  // console.log(currencyMessage)
  // console.log( toCurrency);
  // console.log(fromCurrency);
  // console.log(storeCurrency);

  currencyMessage.innerText = `${
    storeCurrency[fromCurrency] * currencyAmount
  }(${fromCurrency}) = ${
    storeCurrency[toCurrency] * currencyAmount
  }(${toCurrency})`;

  // console.log(storeCurrency[fromCurrency]);
  // console.log(storeCurrency[toCurrency]);
}


async function getCurrency(countryCurrency) {

  const result = await fetch(baseURL + countryCurrency);
  jsonResult = await result.json();
  storeCurrency = jsonResult.conversion_rates;
  console.log(storeCurrency);

  return storeCurrency;
}

button.addEventListener("click", async function (event) {
  event.preventDefault();
  // works for prevent to click button

  let amount = document.querySelector(".amount input");
  currencyAmount = amount.value;

  if (currencyAmount == " " || currencyAmount < 1) {
    currencyAmount = 1;
    amount.value = "1";
  }
  setCurrency();
});
