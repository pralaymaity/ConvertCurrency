
const baseURL = "https://v6.exchangerate-api.com/v6/8261db688a15107471ba2bf7/latest/"

let dropdown = document.querySelectorAll(".dropdown select")
let button = document.querySelector("form button")

let toCurrency = null
let fromCurrency = null
let currencyAmount = 1

const countryList = {
    IN:"INR",
    US:"USD",
    FR:"EUR",
    AU:"AUD"
}
let  storeCurrency = null;

(async function (){

    for(let select of dropdown){
    
        // for of loop use for every element in select tag
    
        for(let  countryCode in countryList ){
    
            // for in loop use for every key in countryList
    
            let newOption = document.createElement("option")
            //dynamically create an element called option

            let countryCurrency = countryList[countryCode]
            newOption.innerText = countryCurrency
            //some text into the option element
    
            newOption.value = countryCode 
            //same as value into the option element
    
            if (select.name ==="from" && countryCode === "AU") {
                newOption.selected = "selected";
                fromCurrency = countryCurrency;
                await getCurrency(countryCurrency)
    
            }// it means selected the country countryCode
            else if(select.name ==="to" && countryCode === "US"){
                newOption.selected = "selected"
                toCurrency = countryCurrency
                setCurrency()
                
            }
            select.append(newOption)
            // just append into select tag in both position
            // console.log(select);    
        }
        //console.log(select);
        flagChange(select)
    
        select.addEventListener("change",async function(evt){
            // console.log(evt);
            // console.log(evt.target);
            flagChange(evt.target)

            if (select.name ==="from"){
                fromCurrency = countryList[evt.target.value]
                //console.log(fromCurrency);
                //await getCurrency(countryList[evt.target.value])
                await getCurrency(fromCurrency)
            }
            else if(select.name ==="to"){
                toCurrency = countryList[evt.target.value]
                //console.log(toCurrency);
            }            
            setCurrency()
            //event.target provides a reference to the element
            // that can be modified
        })
    }    
})();

function flagChange(element){
    //console.log(element);

    let currencyCode = element.value
     //console.log(currencyCode);

    // let nationCurrency = countryList[currencyCode]
    //  console.log(nationCurrency);
    
    let newSource = `https://flagsapi.com/${currencyCode}/flat/64.png`
    
    let img = element.parentElement.querySelector("img")
    img.src = newSource;
}

function setCurrency() {

    let currencyMessage = document.querySelector(".message")
     
    // console.log(currencyMessage)
    // console.log( toCurrency); 
    // console.log(fromCurrency);
    // console.log(storeCurrency);  
    
    currencyMessage.innerText = `${storeCurrency[fromCurrency] * currencyAmount}(${fromCurrency}) = ${storeCurrency[toCurrency]*currencyAmount}(${toCurrency})`

    // console.log(storeCurrency[fromCurrency]);
    // console.log(storeCurrency[toCurrency]);
}
//setCurrency()

async function getCurrency(countryCode) { 
    const  result = await fetch(baseURL + countryCode)
    jsonResult = await result.json();
    storeCurrency = jsonResult.conversion_rates
    //console.log(storeCurrency);
    //console.log(storeCurrency.conversion_rates);
    return    
}
button.addEventListener("click",async function(event){

   event.preventDefault(); 
   // works for prevent to click button

   let amount = document.querySelector(".amount input")
    currencyAmount = amount.value
   
   if (currencyAmount == " " || currencyAmount < 1) {
    currencyAmount = 1
    amount.value = "1"
   }
   setCurrency()
})
    

