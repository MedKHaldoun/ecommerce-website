data = getFromLocal("Data");

products_date = data.products_date;

//console.table(products_date);
var FilterdData = "";
var products = "",
  markes = "",
  Genders = "",
  categorys = "";

for (var i = 0; i < products_date.length; i++) {
  var marke = products_date[i].Mark,
    Gender = products_date[i].Gender,
    category = products_date[i].category;

  //create dropdown of markes
  if (
    markes.indexOf("<option value='" + marke + "'>" + marke + "</option>") == -1
  ) {
    markes += "<option value='" + marke + "'>" + marke + "</option>";
  }

  //create dropdown of Genders
  if (
    Genders.indexOf("<option value='" + Gender + "'>" + Gender + "</option>") ==
    -1
  ) {
    Genders += "<option value='" + Gender + "'>" + Gender + "</option>";
  }

  //create dropdown of category
  for (let x = 0; x < category.length; x++) {
    if (
      categorys.indexOf(
        "<option value='" + category[x] + "'>" + category[x] + "</option>"
      ) == -1
    ) {
      categorys +=
        "<option value='" + category[x] + "'>" + category[x] + "</option>";
    }
  }
}

//console.log(categorys);
//console.log(Genders);
//console.log(markes);
//     shop_container.insertAdjacentHTML("beforeend", prod);

document
  .querySelector("[data-filter='category']")
  .insertAdjacentHTML("beforeend", categorys);

document
  .querySelector("[data-filter='Gender']")
  .insertAdjacentHTML("beforeend", Genders);

document
  .querySelector("[data-filter='mark']")
  .insertAdjacentHTML("beforeend", markes);

// filter actions
var category_is = "",
  Gender_is = "",
  mark_is = "",
  query_is = "";

var categoryList = document.querySelector("[data-filter='category']");
var GenderList = document.querySelector("[data-filter='Gender']");
var MarkList = document.querySelector("[data-filter='mark']");

const filter_form = document.getElementById("filter_form");
filter_form.addEventListener("change", () => {
  //xxxx
  category_is = GetFilterValues(categoryList);
  Gender_is = GetFilterValues(GenderList);
  mark_is = GetFilterValues(MarkList);
  query_is = document.querySelector("[data-filter='query']").value;

  doFiltter();
});

var filtterBtn = document.querySelector("[data-filter='submit']");
filtterBtn.addEventListener("click", () => {
  query_is = document.querySelector("[data-filter='query']").value;
  doFiltter();
});

function GetFilterValues(from) {
  console.log(from.value);
  return from.value;
}

document.addEventListener("change", () => {
  ProdListEitems.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.parentElement.getAttribute("id");
      let t = item.parentElement.getAttribute("alt");
      location.href = "/sproduct.html?id=" + id + "&t=" + t;
    });
  });
});

if (location.search.includes("womens")) {
  Gender_is = "Womens";
  doFiltter();
}
if (location.search.includes("mens")) {
  Gender_is = "Mans";
  doFiltter();
}
if (location.search.includes("kids")) {
  Gender_is = "Kids";
  doFiltter();
}

function doFiltter() {
  // All product
  shop_container = document.getElementById("shop_container");
  FilterdData = myData.products_date;
  //console.log(FilterdData);

  if (category_is == "" && Gender_is == "" && mark_is == "" && query_is == "") {
    FilterdData = myData.products_date;
  }

  if (query_is != "") {
    FilterdData = FilterdData.filter((x) =>
      x.Title.toLowerCase().includes(query_is.toLowerCase())
    );
    console.table("by query", FilterdData, query_is);
  }
  if (mark_is != "") {
    FilterdData = FilterdData.filter((x) => x.Mark == mark_is);
    console.table("by mark", FilterdData);
  }

  if (Gender_is != "") {
    FilterdData = FilterdData.filter((x) => x.Gender == Gender_is);
    // console.table("by Genger", FilterdData);
  }

  if (category_is != "") {
    FilterdData = FilterdData.filter((x) => x.category.includes(category_is));
    console.table("by Genger", FilterdData);
  }

  //console.log(FilterdData);

  shop_container.innerHTML = "";
  for (i = 0; i < FilterdData.length; i++) {
    if (FilterdData[i].fave == 0) {
      fave = '<i class="material-icons-outlined">favorite_border</i>';
    } else {
      fave = '<i class="material-icons-outlined">favorite</i>';
    }
    prod = `<div class="pro" id="${FilterdData[i].id}" alt="${
      FilterdData[i].Title
    }">
          <img class="image_prod" src="${
            FilterdData[i].image[0]
          }" alt="" loading="lazy"/>
          <div class="des">
            <span>${FilterdData[i].Mark}</span>
            <h5>${FilterdData[i].Title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <span>${FilterdData[i].rating}</span>
            </div>
            <h4>${formatter.format(FilterdData[i].price)}</h4>
          </div>
          <button id="heartBtn" class="heart">${fave}</button>
        </div>`;
    shop_container.insertAdjacentHTML("beforeend", prod);
  }
  if (FilterdData.length == 0) {
    shop_container.innerHTML = `<section class="section-p1" style=" display: flex; justify-content: center; width: 100%; "> <h2>No results</h2> </section>`;
  }
  ProdListEitems = document.querySelectorAll(".image_prod");
  // console.log(domFilltred);
}
