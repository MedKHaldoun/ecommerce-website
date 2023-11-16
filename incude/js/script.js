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

var ProdListEitems = "";
w3.includeHTML();
// mobile bergerbar action
const nav = document.getElementById("navbar");
const bar = document.getElementById("bar");
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
    toggleClass("navbar", "active", "inactive");
    toggleClass("bar", "fa-solid fa-xmark", "fa-solid fa-bars");
  });
}

// currency formatter from "1100" to "1,100.00$"
var formatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
});

// ToggleClass function
function toggleClass(id, c1, c2) {
  var Elem = document.getElementById(id);
  if (Elem.className === c1) {
    Elem.className = c2;
  } else {
    Elem.className = c1;
  }
}

if (location.pathname.includes("index.html") || location.pathname == "/") {
  // Features_Products
  var pro_container1 = document.getElementById("pro_container1");
  //console.log(myData.products_date);

  Features_Products = myData.products_date;

  Features_Products = Features_Products.filter((x) => x.prod_is == "Feature");

  for (
    i = 0;
    i < (Features_Products.length < 10 ? Features_Products.length : 10);
    i++
  ) {
    if (Features_Products[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${Features_Products[i].id}" alt="${
      Features_Products[i].Title
    }">
          <img class="image_prod" src="${
            Features_Products[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${Features_Products[i].Mark}</span>
            <h5>${Features_Products[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${Features_Products[i].rating}</span>
            </div>
            <h4>${formatter.format(Features_Products[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_container1.insertAdjacentHTML("beforeend", prod);
  }

  // New_Arrivals
  var pro_container2 = document.getElementById("pro_container2");
  New_Arrivals = myData.products_date;

  New_Arrivals = New_Arrivals.filter((x) => x.prod_is == "Arrival");
  for (
    i = 0;
    i < (New_Arrivals.length < 10 ? Features_Products.length : 10);
    i++
  ) {
    if (New_Arrivals[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${New_Arrivals[i].id}" alt="${
      New_Arrivals[i].Title
    }">
          <img class="image_prod" src="${
            New_Arrivals[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${New_Arrivals[i].Mark}</span>
            <h5>${New_Arrivals[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${New_Arrivals[i].rating}</span>
            </div>
            <h4>${formatter.format(New_Arrivals[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_container2.insertAdjacentHTML("beforeend", prod);
  }

  // Top products
  var pro_top = document.getElementById("pro_top");
  New_Arrivals = myData.products_date;

  TopPro = New_Arrivals.filter((x) => x.prod_is == "Top");
  for (i = 0; i < TopPro.length; i++) {
    if (TopPro[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${TopPro[i].id}" alt="${TopPro[i].Title}">
          <img class="image_prod" src="${
            TopPro[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${TopPro[i].Mark}</span>
            <h5>${TopPro[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${TopPro[i].rating}</span>
            </div>
            <h4>${formatter.format(TopPro[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_top.insertAdjacentHTML("beforeend", prod);
  }

  // Banner3
  var banner3 = document.getElementById("banner3");
  banner3_data = myData.banner3;
  for (i = 0; i < banner3_data.length; i++) {
    banners_elem = `<div class="banner-box" style="background-image: url(${banner3_data[i].background});">
        <h2>${banner3_data[i].h2}</h2>
        <h3>${banner3_data[i].h3}</h3>
      </div>`;
    banner3.insertAdjacentHTML("beforeend", banners_elem);
  }
}
//index js code end

// Shop page  start
if (location.pathname.includes("shop.html")) {
  // All product
  var shop_container = document.getElementById("shop_container");
  products_date = myData.products_date;

  for (i = 0; i < products_date.length; i++) {
    if (products_date[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${products_date[i].id}" alt="${
      products_date[i].Title
    }">
          <img class="image_prod" src="${
            products_date[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${products_date[i].Mark}</span>
            <h5>${products_date[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${products_date[i].rating}</span>
            </div>
            <h4>${formatter.format(products_date[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    shop_container.insertAdjacentHTML("beforeend", prod);
  }
}

if (location.pathname.includes("sproduct.html")) {
  id = new URL(location.href).searchParams.get("id");
  title = new URL(location.href).searchParams.get("i");
  pro_is = myData.products_date;
  pro_is = pro_is.filter((x) => x.id == id)[0];
  su_bady = document.getElementById("su_bady");

  document.title = "Shop.me" + " : " + pro_is.Title;
  // pro details
  //title
  document.querySelector(
    "#prodetails > div.single-pro-details > h4:nth-child(2)"
  ).innerHTML = pro_is.Title;
  // main img
  document.querySelector("#MainImg").src = pro_is.image[0];
  //price
  document.getElementById("pr").innerHTML = formatter.format(pro_is.price);
  document.getElementById("oldePre").innerHTML = formatter.format(
    pro_is.promo_detalse.olde_price
  );
  // Categories
  let CategoriesHtmlList = "";
  let x = pro_is.category.length;
  for (let i = 0; i < x; i++) {
    if (i < x - 1) {
      CategoriesHtmlList =
        CategoriesHtmlList +
        `<span><a href="#">${pro_is.category[i]},</a></span>`;
    } else {
      CategoriesHtmlList =
        CategoriesHtmlList +
        `<span><a href="#">${pro_is.category[i]}</a></span>`;
    }
    console.log("CategoriesHtmlList : ", pro_is.category[i]);
  }
  document
    .getElementById("Categories")
    .insertAdjacentHTML("afterend", CategoriesHtmlList);
  // des
  document.querySelector(
    "#prodetails > div.single-pro-details > span"
  ).innerHTML = pro_is.descreption;
  //category
  document.querySelector(
    "#prodetails > div.single-pro-details > h5 > span"
  ).innerHTML =
    pro_is.Gender + " / " + pro_is.Mark + " / " + pro_is.category[0];

  // small-img-group
  var small_img_group = document.querySelector(".small-img-group");

  small_img_group.innerHTML = `
    <div class="small-img-col">
    <img class="small-img" src="${pro_is.image[0]}" width="100%" alt="">
          </div>
    <div class="small-img-col">
    <img class="small-img" src="${pro_is.image[1]}" width="100%" alt="">
        </div>
    <div class="small-img-col">
    <img class="small-img" src="${pro_is.image[2]}" width="100%" alt="">
          </div>
    <div class="small-img-col">
        <img class="small-img" src="${pro_is.image[3]}" width="100%" alt="">
    </div>
    `;
  // Features_Products // chop page
  var pro_container3 = document.getElementById("pro_container3");
  Features_Pro = myData.products_date;

  Features_Pro = Features_Pro.filter(
    (x) => x.category[0] == pro_is.category[0] && x.Gender == pro_is.Gender
  );

  for (i = 0; i < 5; i++) {
    if (Features_Pro[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${Features_Pro[i].id}" alt="${
      Features_Pro[i].Title
    }">
          <img class="image_prod" src="${Features_Pro[i].image[0]}" alt="${
      Features_Pro[i].Title
    }" loading="lazy"/>
          <div class="des">
            <span>${Features_Pro[i].Mark}</span>  
            <h5 >${Features_Pro[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${Features_Pro[i].rating}</span>

            </div>
            <h4>${formatter.format(Features_Pro[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_container3.insertAdjacentHTML("beforeend", prod);
  }

  // Mainpro image change By click
  var MainImg = document.getElementById("MainImg");
  document.querySelectorAll(".small-img").forEach((item) => {
    item.addEventListener("click", (event) => {
      MainImg.src = item.src;
    });
  });

  // Mainpro image change By click end
}

//all pro clicks aply for all pages
if (document.querySelectorAll(".pro")) {
  ProdListEitems = document.querySelectorAll(".image_prod");
  addProdEitemToCart = document.querySelectorAll(".cart");

  ProdListEitems.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.parentElement.getAttribute("id");
      let t = item.parentElement.getAttribute("alt");
      location.href = "/sproduct.html?id=" + id + "&t=" + t;
    });
  });
} // end if

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
// !

document.querySelector("#countCart").innerHTML = QtyTotalInCart();
document.querySelector("#count2").innerHTML = QtyTotalInCart();
// coupons list

if (getFromLocal("coupons") == null) {
  saveCoupons("/incude/copons.json");
  async function saveCoupons(url) {
    const response = await fetch(url);
    let coupons = await response.json();
    // console.log("Copons = ", Copons);
    saveToLocal("coupons", coupons);
  }
}

function ShowFeatursPro(Filler1) {
  // Features_Products
  pro_container1 = document.getElementById("pro_container1");
  //console.log(myData.products_date);
  Features_Products = myData.products_date;
  pro_container1.innerHTML = "";

  if (Filler1 == null) {
    Features_Products = Features_Products.filter((x) => x.prod_is == "Feature");
  } else {
    Features_Products = Features_Products.filter(
      (x) => x.prod_is == "Feature" && x.Gender == Filler1
    );
  }

  for (
    i = 0;
    i < (Features_Products.length < 10 ? Features_Products.length : 10);
    i++
  ) {
    if (Features_Products[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${Features_Products[i].id}" alt="${
      Features_Products[i].Title
    }">
          <img class="image_prod" src="${
            Features_Products[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${Features_Products[i].Mark}</span>
            <h5>${Features_Products[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${Features_Products[i].rating}</span>
            </div>
            <h4>${formatter.format(Features_Products[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_container1.insertAdjacentHTML("beforeend", prod);
  }
}

function ShowArrivalsPro(Filler2) {
  // Arrivals_Products
  pro_container2 = document.getElementById("pro_container2");
  //console.log(myData.products_date);
  Arrivals_Products = myData.products_date;
  pro_container2.innerHTML = "";

  if (Filler2 == null) {
    Arrivals_Products = Arrivals_Products.filter((x) => x.prod_is == "Arrival");
  } else {
    Arrivals_Products = Arrivals_Products.filter(
      (x) => x.prod_is == "Arrival" && x.Gender == Filler2
    );
  }

  for (i = 0; i < 10; i++) {
    if (Arrivals_Products[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${Arrivals_Products[i].id}" alt="${
      Arrivals_Products[i].Title
    }">
          <img class="image_prod" src="${
            Arrivals_Products[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${Arrivals_Products[i].Mark}</span>
            <h5>${Arrivals_Products[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${Arrivals_Products[i].rating}</span>
            </div>
            <h4>${formatter.format(Arrivals_Products[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_container2.insertAdjacentHTML("beforeend", prod);
  }
}

function ShowTopPro(Filler3) {
  // Arrivals_Products
  pro_top = document.getElementById("pro_top");
  //console.log(myData.products_date);
  Products = myData.products_date;
  pro_top.innerHTML = "";

  if (Filler3 == null) {
    Products = Products.filter((x) => x.prod_is == "Top");
  } else {
    Products = Products.filter(
      (x) => x.prod_is == "Top" && x.Gender == Filler3
    );
  }

  for (i = 0; i < Products.length; i++) {
    if (Products[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${Products[i].id}" alt="${Products[i].Title}">
          <img class="image_prod" src="${
            Products[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${Products[i].Mark}</span>
            <h5>${Products[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${Products[i].rating}</span>
            </div>
            <h4>${formatter.format(Products[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    pro_top.insertAdjacentHTML("beforeend", prod);
  }
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
  });
});

document.addEventListener("click", () => {
  ProdListEitems = document.querySelectorAll(".image_prod");
  ProdListEitems.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.parentElement.getAttribute("id");
      let t = item.parentElement.getAttribute("alt");
      location.href = "/sproduct.html?id=" + id + "&t=" + t;
    });
  });

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
    });
  });
});

const myTimeout = setTimeout(myGreeting, 4000);

function myGreeting() {
  //alert("test");
  if (
    document.querySelector("#pro_container1").innerHTML == "" ||
    getFromLocal("Data") == null
  ) {
    location.reload();
  }
}

function myStopFunction() {
  clearTimeout(myTimeout);
}
