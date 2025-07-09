const flipArrow = document.getElementById("flipArrow");
    const cardContainer = document.querySelector(".card-container");

    flipArrow.addEventListener("click", () => {
      cardContainer.classList.toggle("flip");
      const keychain = document.querySelector(".keychain");
      keychain.classList.add("wiggle");
      setTimeout(() => keychain.classList.remove("wiggle"), 600);
    });

    const qrText = document.getElementById("qrText");
    const qrImage = document.getElementById("qrImage");

    qrText.addEventListener("input", () => {
      const value = qrText.value.trim();
      qrImage.src = value ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value)}` : "";
    });

    const nameInput = document.getElementById("nameInput");
    const previewName = document.getElementById("previewName");

    nameInput.addEventListener("input", () => {
      previewName.textContent = nameInput.value.trim() || "your name";
    });

    const colorInput = document.getElementById("colour");
    const cardFront = document.querySelector(".card-front");
    const cardBack = document.querySelector(".card-back");

    colorInput.addEventListener("input", () => {
      const color = colorInput.value;
      cardFront.style.backgroundColor = color;
      cardBack.style.backgroundColor = color;
    });

    const pictureInput = document.getElementById("picture");
    const profilePic = document.getElementById("profile-pic");

    let isDragging = false;
    let startX, startY, offsetX = 0, offsetY = 0, currentScale = 1;

    pictureInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          profilePic.src = event.target.result;
          offsetX = offsetY = 0;
          currentScale = 1;
          updateTransform();
        };
        reader.readAsDataURL(file);
      }
    });

    profilePic.addEventListener("mousedown", function (e) {
      isDragging = true;
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      profilePic.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      updateTransform();
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
      profilePic.style.cursor = "grab";
    });

    profilePic.addEventListener("wheel", function (e) {
      e.preventDefault();
      currentScale += e.deltaY < 0 ? 0.05 : -0.05;
      currentScale = Math.max(0.2, currentScale);
      updateTransform();
    });

    function updateTransform() {
      profilePic.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${currentScale})`;
    }

    profilePic.style.cursor = "grab";

    document.getElementById("submitCard").addEventListener("click", () => {
      const card = document.getElementById("card-mockup");
      html2canvas(card).then(canvas => {
        const imageData = canvas.toDataURL("image/png").split(',')[1];
        fetch("https://script.google.com/macros/s/AKfycbx7mMsrMfzlQ1ULBVK9UZtMV5I2REtRRQ8R8o6lbWXnuXNgTNKXIKE3xrYHnmdDWYDN/exec", {
          method: "POST",
          body: new URLSearchParams({
            data: imageData,
            name: document.getElementById("nameInput").value || "custom_card"
          })
        }).then(res => alert(res.ok ? "Submitted successfully!" : "Failed to submit."));
      });
    });
