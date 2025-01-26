const input = document.querySelector("#number-intp");
const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("us"));
  },
  loadUtils: () =>
    import(
      "https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.1/build/js/utils.js"
    ),
});

var button = document.querySelector("#wa-form-sbmt");
var form = document.querySelector("#wf-form-whatsapp-general");
var duplicateButton = document.getElementById("dup-but-sf");

duplicateButton.addEventListener("click", function (event) {
  if (!input.value.trim()) {
    alert("Kindly enter your phone number");
  } else if (iti.isValidNumber()) {
    console.log("Phone number is valid");
    const number = iti.getNumber(intlTelInput.utils.numberFormat.E164);
    input.value = number;

    console.log("New number submitted");
    button.click();
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    console.log(msg);
    alert("Kindly enter a valid phone number");
  }
});
