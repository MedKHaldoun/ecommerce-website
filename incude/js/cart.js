w3.includeHTML();
//

var subTotalV = 0;
var coponRedcuctionV = 0;
var fTotalV = 0;
var DISCOUNtPerc = 0;
var DISCOUNtAmount = 0;
var PAYMENT_MODE;
var OrderDetails;

//
checkForEmptyCart();

if (mkCart().length == 0) {
  iziToast.warning({
    title: "Caution",
    message: "no items in cart ! ",
    timeout: 8000,
  });
} else {
  showItems();
} // end innerItems

function saveToLocal(from, data) {
  return localStorage.setItem(from, JSON.stringify(data));
}

function getFromLocal(from) {
  data = localStorage.getItem(from);
  return JSON.parse(data);
}

function showItems() {
  const table = document.getElementById("tbody");
  document.getElementById("tbody").innerHTML = "";
  cartItems = getFromLocal("cart");

  for (let i = 0; i < cartItems.length; i++) {
    prodItem = `
    <tr itemid='${i}'>
        <td>
        <button  itemid='${i}' class="material-icons-outlined remove_item"> highlight_off </button>
        </td>
        <td>
            <img src="${cartItems[i].pImage}" alt="${cartItems[i].pTitle}" />
        </td>
        <td>${cartItems[i].pTitle}</td>
        <td>${formatter.format(cartItems[i].pPrice)}</td>
        <td><input type="number" min="1" value="${
          cartItems[i].pQty
        }" is="qty"/></td>
        <td>${cartItems[i].pSize}</td>
        <td>${formatter.format(cartItems[i].pPrice * cartItems[i].pQty)}</td>
    </tr>
    `;

    table.insertAdjacentHTML("beforeend", prodItem);
  }
  // get the sum after showing data
  subtotalF();
  finTotal();
}

function subtotalF() {
  const subtotal = document.getElementById("Cart_Subtotal");
  cartItems = getFromLocal("cart");
  subTotalV = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let x = cartItems[i].pPrice * cartItems[i].pQty;
    subTotalV = subTotalV + x;
  }

  subtotal.innerHTML = formatter.format(subTotalV);
  return subTotalV;
}

function finTotal() {
  let coponRedcuctionV = document.getElementById("Reductionv").innerHTML;
  fTotalV = 0;
  ftotal = document.getElementById("Total");
  fTotalV = subtotalF() + Number(coponRedcuctionV);
  ftotal.innerHTML = formatter.format(fTotalV);
  return fTotalV;
}

document.addEventListener("click", () => {
  checkForEmptyCart();
  document.querySelectorAll(".remove_item").forEach((item) => {
    item.addEventListener("click", (event) => {
      let ids = item.getAttribute("itemid");

      deletItemF(ids);
      iziToast.success({
        title: "OK",
        message: "Item has been deleted successfully!",
      });
    });
  });

  // ? Qt in cart
  document.querySelector("#countCart").innerHTML = QtyTotalInCart();

  //  new calc total amount after any click
});

// forEach error after delet item

function deletItemF(ids) {
  cartItems = getFromLocal("cart");
  delete cartItems[ids];
  let newData = [];
  for (i = 0; i < cartItems.length; i++) {
    if (cartItems[i] != undefined) {
      newData.push(cartItems[i]);
    }
  }
  saveToLocal("cart", newData);

  showItems();
}

// list of copons is

//apply coupon button
btnCoupon = document.getElementById("btnCoupon");
btnCoupon.addEventListener("click", () => {
  InputCoupon = document.getElementById("InputCoupon");
  obj = getFromLocal("coupons").find((o) => o.cp == InputCoupon.value);
  // copon introvable
  if (obj == undefined || InputCoupon.value == "") {
    iziToast.error({
      title: "error",
      message: "Coupon Inalide",
    });
    document.getElementById("Reductionv").innerHTML = 0;

    return 0;
  } else {
    // date validation
    let d1 = new Date(obj.valideTo);
    let d2 = new Date();
    if (d1 < d2) {
      // date invalide
      iziToast.error({
        title: "error",
        message: "coupon is expired on " + obj.valideTo,
      });
      document.getElementById("Reductionv").innerHTML = 0;
      return 0;
    } else {
      document.getElementById("Reductionv").innerHTML =
        (subtotalF() * obj.discountPerc) / 100;
      finTotal();
      DISCOUNtPerc = obj.discountPerc;
      DISCOUNtAmount = (subtotalF() * obj.discountPerc) / 100;
      document.getElementById("perc").innerHTML = obj.discountPerc;
      iziToast.success({
        title: "OK",
        message: "discount has been applied!",
      });
    }
  }
});

// change Quality (input)
document.querySelectorAll("input[is=qty]").forEach((item) => {
  item.addEventListener("change", () => {
    let id = item.parentElement.parentElement.getAttribute("itemid");
    let cartData = getFromLocal("cart");
    //console.table(cartData);
    cartData[id].pQty = item.value;
    console.table(cartData);
    saveToLocal("cart", cartData);
    console.log();
    thisItem = item.parentElement.parentElement.querySelectorAll("td");
    thisItem[6].innerHTML = formatter.format(
      cartData[id].pQty * cartData[id].pPrice
    );

    console.log(thisItem[6]);

    subtotalF();
    finTotal();
  });
});

//CheckoutModal
modal = document.getElementById("CheckoutModal");
BtnCheckoutModal = document.getElementById("BtnCheckoutModal");
// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
BtnCheckoutModal.onclick = function () {
  let cartItems = getFromLocal("cart");

  modal.style.display = "block";
  ElementSubtotal = document.querySelector("#subtotal");
  // List of items Checkout

  const checkoutProdList = document.getElementById("checkoutProdList");
  document.getElementById("checkoutProdList").innerHTML = "";

  for (let i = 0; i < cartItems.length; i++) {
    prodItem = `
    <p><a><h3 class="h_bill" href="#">${cartItems[i].pTitle}</h3></a>
    <span class="total_p">Qte : ${cartItems[i].pQty} / Size : ${
      cartItems[i].pSize
    } / price :  ${cartItems[i].pPrice * cartItems[i].pQty} MAD</span></p>`;

    checkoutProdList.insertAdjacentHTML("beforeend", prodItem);
  }
  document.querySelector("#c_disc_p").innerHTML = DISCOUNtPerc;
  document.querySelector("#c_disc").innerHTML = DISCOUNtAmount;
  document.querySelector("#c_total").innerHTML = subtotalF();
  document.querySelector("#T_total").innerHTML =
    subtotalF() + Number(DISCOUNtAmount);
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// fCheckout Event Listener

document.querySelectorAll("input[name=payment-method]").forEach((e) => {
  e.addEventListener("click", () => {
    PAYMENT_MODE = e.id;
    if (e.id == "paypal") {
      iziToast.error({
        title: "error",
        message: "payment Method unsupported in your country",
      });
    } else if (e.id == "visa") {
      iziToast.error({
        title: "error",
        message: "payment Method unsupported in your country",
      });
    } else if (e.id == "mastercard") {
      iziToast.error({
        title: "error",
        message: "Payment Method unsupported in your country",
      });
    } else {
      iziToast.success({
        title: "OK",
        message: "Payment Method has been selected!",
      });
    }
  });
});

// ConfermCheckout
BtnConfermCheckout = document.getElementById("ConfermCheckout");
BtnConfermCheckout.addEventListener("click", () => {
  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let email = document.getElementById("email");
  let adr = document.getElementById("adr");
  let phon = document.getElementById("phon");
  let city = document.getElementById("city");
  let zip = document.getElementById("zip");

  // check the information

  if (
    fname.value == "" &&
    lname.value == "" &&
    email.value == "" &&
    adr.value == "" &&
    phon.value == "" &&
    city.value == "" &&
    zip.value == ""
  ) {
    iziToast.error({
      title: "error",
      message: "Please fill all information",
    });
  } else {
    // check the payment mode
    if (PAYMENT_MODE != "delivery") {
      iziToast.error({
        title: "error",
        message: "Payment Method unsupported in your country",
      });
    } else {
      const bot = {
        TOKEN: "bot0000000000:----------------------------",
        chatID: "-0000000000000",
      };
      // order date
      today = new Date().toDateString();

      let cartItems = getFromLocal("cart");
      OrderDetails = "";
      for (let i = 0; i < cartItems.length; i++) {
        OrderDetails =
          OrderDetails +
          `____ item (${i + 1}) ____ 
Product ID : ${cartItems[i].pid}
Title       : ${cartItems[i].pTitle}
Size        : ${cartItems[i].pSize}
Quantity : ${cartItems[i].pQty}

`;
      }
      console.log(OrderDetails);

      let cardelementcontent = `
#Client_information :
____________________
Full Name : ${fname.value + "" + lname.value} 
Email          : ${email.value}
Address     : ${adr.value}
City           : ${city.value}
Zip Code  : ${zip.value}
Phone        : ${phon.value}

#Order_Details : ${today}
__________________
${OrderDetails}
#Payment_Details
__________________
Payment Mode  : cash on delivery
Shipping fee	      : free
Discount ${DISCOUNtPerc}%	    : MAD ${DISCOUNtAmount}
Price Total	      : MAD ${subtotalF()}
Total               : MAD ${subtotalF() + Number(DISCOUNtAmount)}

`;
      console.log(cardelementcontent);
      //new date() forma
      // avoid double click

      url = `https://api.telegram.org/${bot.TOKEN}/sendMessage`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `${cardelementcontent}`,
          chat_id: bot.chatID,
        }),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.ok == true) {
            iziToast.success({
              title: "OK",
              message: "Order has been sent successfully!",
            });

            //reset all
            resetCart();
            checkForEmptyCart();
            // end reset
          } else {
            iziToast.error({
              title: "Error",
              message: "Order error : " + error,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          iziToast.error({
            title: "Error",
            message: "Order error : " + error,
          });
        });
    }
  } //end if form is null !
});

function checkForEmptyCart() {
  if (getFromLocal("cart").length == 0) {
    document.getElementById("card").innerHTML = "";
    document.getElementById("card-add").innerHTML = "";
    document.querySelector("#emptyHtmlBlock").style.display = "block";
  }
}

//
function resetCart() {
  subTotalV = 0;
  coponRedcuctionV = 0;
  fTotalV = 0;
  DISCOUNtPerc = 0;
  DISCOUNtAmount = 0;
  PAYMENT_MODE = "";
  OrderDetails = "";
  checkForEmptyCart();
  let form = document.getElementById("fCheckout");
  form.reset();
  // reset cart
  cartItems = [];
  saveToLocal("cart", cartItems);
  document.querySelector("#countCart").innerHTML = QtyTotalInCart();

  modal.style.display = "none";

  finTotal();

  showItems();
}
