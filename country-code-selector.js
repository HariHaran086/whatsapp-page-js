const input = document.querySelector("#number-intp");
window.intlTelInput(input, {
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

button.addEventListener("click", function (event) {
  event.preventDefault();

  reset();

  if (!input.value.trim()) {
    alert("Kindly enter your phone number");
  } else if (iti.isValidNumber()) {
    console.log("Phone number is valid");
    form.submit();
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    console.log(msg);
    alert("Kindly enter a valid phone number");
  }
});
