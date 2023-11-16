const mailForm = document.getElementById("mailForm");

const bot = {
  TOKEN: "bot0000000000:-----------------------0Q4-----",
  chatID: "-0001000000000",
};

const BtnsendEmail = document.getElementById("sendemail");
BtnsendEmail.addEventListener("click", function (event) {
  event.preventDefault();
  sendEmail();
  setTimeout(() => {}, 3500);
});

function sendEmail() {
  const form = document.querySelector("form");
  let emailName = document.getElementById("emailName").value;
  let email = document.getElementById("email").value;
  let emailSubject = document.getElementById("emailSubject").value;
  let emailText = document.getElementById("emailText").value;

  if (emailName != "" && email != "" && emailSubject != "" && emailText != "") {
    let mailContent = `Name : ${emailName} From : ${email}  Subject : ${emailSubject}  ${emailText}`;

    //new date() forma
    var today = new Date().toDateString();
    // avoid double click
    BtnsendEmail.disabled = true;

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
        text: `Full Name   : ${emailName}
From    : ${email}  |  on : ${today}
Subject  : ${emailSubject}  
__________________________________________________________
${emailText}

`,
        chat_id: bot.chatID,
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.ok == true) {
          iziToast.success({
            title: "OK",
            message: "Email has been sent successfully!",
          });
          //Enable send btn
          BtnsendEmail.disabled = false;
          // resrt all inputs form
          form.reset();
        } else {
          iziToast.error({
            title: "Error",
            message: "Sending error : " + error,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        iziToast.error({
          title: "Error",
          message: "Sending error : " + error,
        });
      });
  } else {
    iziToast.error({
      title: "Error",
      message: "Please fill in all the information",
    });
  }
}
