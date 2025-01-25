const input = document.querySelector("#number-intp");
const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  console.log('Webflow scripts disabled');
});

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

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!input.value.trim()) {
    alert("Kindly enter your phone number");
  } else if (iti.isValidNumber()) {
    console.log("Phone number is valid");
    const formData = new FormData(form);

    // Use fetch API to submit the form data
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Form submitted successfully!');
          // Optional: Handle success state here (e.g., show a thank-you message)
        } else {
          console.error('Form submission failed.');
        }
      })
      .catch(error => console.error('Error:', error))
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    console.log(msg);
    alert("Kindly enter a valid phone number");
  }
});
