let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let Btn = document.querySelector("#button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let output = document.querySelector(".msg");

for(let select of dropdowns) {
    for (let currCode of Object.keys(countryList)) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// real work
// Btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const URL = `${BASE_URL}/${from}/${to}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()];
//     console.log(rate);
//     console.log(rate * amtVal);
// });





// Btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();

//   let amount = document.querySelector("#amount");
//   let amtVal = amount.value;

//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }

//   const from = fromCurr.value.toLowerCase();
//   const to = toCurr.value.toLowerCase();

//   const URL = `${BASE_URL}/${from}/${to}.json`;

//   let response = await fetch(URL);
//   let data = await response.json();

//   let rate = data[to];
//   let finalAmount = rate * amtVal;

//   console.log("Rate:", rate);
//   console.log("Final Amount:", finalAmount);
// });








Btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}.json`;

  try {
    let response = await fetch(URL);

    if (!response.ok) {
      throw new Error("API error");
    }

    let data = await response.json();
    let rate = data[from][to];
    let result = rate * amtVal;

    let amountVal2 = document.querySelector("#amount").value;
    console.log("Rate:", rate);
    console.log("Result:", result);
    output.innerHTML = `1${from.toUpperCase()} = ${rate.toFixed(2)}${to.toUpperCase()}<br><br>
    ${amountVal2}${from.toUpperCase()} = ${result.toFixed(2)}${to.toUpperCase()}
    `


  } catch (error) {
    console.error("Conversion failed:", error.message);
  }
});
