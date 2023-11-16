function saveToLocal(from, data) {
  return localStorage.setItem(from, JSON.stringify(data));
}

function getFromLocal(from) {
  data = localStorage.getItem(from);
  return JSON.parse(data);
}

function mkCart() {
  if (localStorage.getItem("cart") == null) {
    // make new Item
    data = [];
    localStorage.setItem("cart", JSON.stringify(data));
  } else {
    return getFromLocal("cart");
  }
}

function QtyTotalInCart() {
  let itm = getFromLocal("cart");
  let Qt = 0;
  for (let i = 0; i < itm.length; i++) {
    Qt = Number(Qt) + Number(itm[i].pQty);
  }
  return Qt;
}

//inisialisation of the card
mkCart();
// inisialisation Data
var myData = "";
if (getFromLocal("Data") != null) {
  myData = getFromLocal("Data");
} else {
  // strat  function after 2000ms
  /*setTimeout(*/ fetchDataAsync("/incude/data.json") /*, 300)*/;
  async function fetchDataAsync(url) {
    const response = await fetch(url);
    JSON_DATA = await response.json();
    console.log("My Data = ", myData);
    saveToLocal("Data", JSON_DATA);
    myData = getFromLocal("Data");
  }
}
