//inisialisation of the card
mkCart();
const body = document.getElementById("su_bady");

const BtnaddToCart = document.getElementById("addToCart");

BtnaddToCart.addEventListener("click", () => {
  selectSize = document.querySelector("select").value;
  qtyOrder = document.getElementById("QTY").value;

  //forn new item

  // if size = 0
  if (selectSize == 0) {
    iziToast.warning({
      title: "Caution",
      message: "Please select the size ",
    });
  }
  // product size selected
  else {
    if (qtyOrder <= 0) {
      iziToast.error({
        title: "error",
        message: "Inalide Quantity",
      });
    } else {
      data = {
        pid: pro_is.id,
        pImage: pro_is.image[0],
        pTitle: pro_is.Title,
        pPrice: Number(pro_is.price),
        pQty: Number(qtyOrder),
        pSize: selectSize,
      };
      addToCartF("cart", data);
    }
  }
});

function addToCartF(from, data) {
  oldeData = getFromLocal(from);
  newData = data;

  // if ext data in cart
  if (oldeData.length != 0) {
    obj = oldeData.find(
      (o) => o.pid == newData.pid && o.pSize == newData.pSize
    );

    if (obj != undefined) {
      for (i = 0; i < oldeData.length; i++) {
        if (oldeData[i].pid == data.pid && oldeData[i].pSize == data.pSize) {
          oldeData[i].pQty = Number(oldeData[i].pQty) + Number(newData.pQty);
          saveToLocal(from, oldeData);

          iziToast.success({
            title: "OK",
            message: "Quantity item has been add to cart successfully!",
          });
        }
      }
    } else if (obj == undefined) {
      oldeData.push(newData);
      saveToLocal(from, oldeData);
      iziToast.success({
        title: "OK",
        message: "Item has been add to cart successfully!",
      });
    }
  } // else no data in cart
  else {
    oldeData.push(newData);
    saveToLocal(from, oldeData);
    iziToast.success({
      title: "OK",
      message: "New Item has been add to cart successfully!",
    });
  }
}

document.addEventListener("click", () => {
  document.querySelector("#countCart").innerHTML = QtyTotalInCart();
});

if (location.pathname.includes("sproduct.html")) {
  id = new URL(location.href).searchParams.get("id");
  title = new URL(location.href).searchParams.get("i");
  pro_is = jsond.products_date;
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
  // Features_Products
  var pro_container3 = document.getElementById("pro_container3");
  Features_Pro = jsond.products_date;

  Features_Pro = Features_Pro.filter(
    (x) => x.category[0] == pro_is.category[0] && x.Gender == pro_is.Gender
  );

  for (i = 0; i < 4; i++) {
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
          <a href="#" class="heart"><i class="material-icons-outlined"> favorite_border</i></a>
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
