function getFromLocal(from) {
  data = localStorage.getItem(from);
  return JSON.parse(data);
}

// currency formatter from "1100" to "1,100.00$"
var formatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
});

var myData = getFromLocal("Data");

var shop_fave = document.getElementById("shop_fave");
products_date = myData.products_date;
products_date = products_date.filter((x) => x.fave == 1);
//console.table(products_date);
for (i = 0; i < products_date.length; i++) {
  if (products_date[i].fave == 0) {
    fave = '<i class="material-icons-outlined">favorite_border</i>';
  } else {
    fave = '<i class="material-icons-outlined">favorite</i>';
  }
  prod = `<div class="pro" id="${products_date[i].id}" alt="${
    products_date[i].Title
  }"><img class="image_prod" src="${
    products_date[i].image[0]
  }" alt="" loading="lazy"/>
  <div class="des"><span>${products_date[i].Mark}</span>
     <h5>${products_date[i].Title}</h5>
    <div class="star">
        <i class="fa-solid fa-star"></i>
          <span>${products_date[i].rating}</span>
        </div>
        <h4>${formatter.format(products_date[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
  shop_fave.insertAdjacentHTML("beforeend", prod);
}

if (products_date.length == 0) {
  document.querySelector("#emptyHtmlBlock").style.display = "block";
}

// add to fav
document.querySelectorAll("#heartBtn").forEach((item) => {
  item.addEventListener("click", () => {
    let id = item.parentElement.id;
    console.log(id);
    for (let i = 0; i < myData.products_date.length; i++) {
      if (myData.products_date[i].id == id) {
        let fave = myData.products_date[i].fave;
        if (fave == 1) {
          myData.products_date[i].fave = 0;
          item.innerHTML =
            '<i class="material-icons-outlined">favorite_border</i>';
        } else {
          myData.products_date[i].fave = 1;
          item.innerHTML = '<i class="material-icons-outlined">favorite</i>';
        }
      }
    }

    saveToLocal("Data", myData);
    location.reload();
  });
});

ProdListEitems = document.querySelectorAll(".image_prod");

ProdListEitems.forEach((item) => {
  item.addEventListener("click", () => {
    let id = item.parentElement.getAttribute("id");
    let t = item.parentElement.getAttribute("alt");
    location.href = "/sproduct.html?id=" + id + "&t=" + t;
  });
});
