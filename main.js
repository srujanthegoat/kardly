

const cardBack = document.getElementById("cardBack"); //this is the div the whole box

const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");//this is the image aka space of the QR
// Listen for any typing or pasting in the QR input
qrText.addEventListener("input", function () {
  const value = qrText.value.trim();//new variable called value
  if (value) {
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      encodeURIComponent(value);
  } else {
    qrImage.src = ""; // remove QR
  }
});


const nameInput = document.getElementById("nameInput");
const previewName = document.getElementById("previewName");

nameInput.addEventListener("input", function () {
const name = nameInput.value.trim();

if (name) {
previewName.textContent = name;
previewName.style.display = "block";
} else {
previewName.textContent = "your name";
previewName.style.display = "block"; // still show, just default
}
});



// background color:
const colorInput = document.getElementById("colour");
const cardFront = document.querySelector(".card-front");

colorInput.addEventListener("input", function () {
const color = colorInput.value;
cardFront.style.backgroundColor = color;
cardBack.style.backgroundColor = color; // Use the existing cardBack variable
});

//picture
const pictureInput = document.getElementById("picture");
    const profilePic = document.getElementById("profile-pic");
    
pictureInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});



const lottieElement = document.getElementById('my-lottie');

lottieElement.addEventListener('mouseenter', function() {
  lottieElement.play();
});

lottieElement.addEventListener('mouseleave', function() {
  lottieElement.pause();
});