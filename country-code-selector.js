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

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default page reload

  const phoneInputField = document.querySelector("#phone");
  const phoneNumber = phoneInputField.value.trim();
  const errorMap = {
    1: "Invalid country code",
    2: "Too short",
    3: "Too long",
    4: "Invalid number",
  };

  if (!phoneNumber) {
    alert("Kindly enter your phone number");
    return;
  }

  const iti = window.intlTelInput(phoneInputField, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  if (iti.isValidNumber()) {
    // Form data setup
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
      .catch(error => console.error('Error:', error));
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    console.error(msg);
    alert("Kindly enter a valid phone number");
  }
});

