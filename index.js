const base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");
for (let select of dropdowns) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    select.append(newoption);
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    }
    if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
    // console.log(code, countryList[code]);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  // console.log(currcode);
  let countrycode = countryList[currcode];
  // console.log(countrycode);
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  // console.log(amtval);
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = 1;
  }
  //console.log(fromcurr,tocurr);
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  //console.log(response);
  let data=await response.json();
  //console.log(data);
  let rate=data[tocurr.value.toLowerCase()];
  console.log(rate);
  let finalamt=amtval*rate;
  console.log(finalamt);
  msg.innerText= `${amtval}${fromcurr.value}=${finalamt}${tocurr.value}`;
  
});
