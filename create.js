function upload(inputId) {
    document.getElementById(inputId).click();
}

document.getElementById("posterInput").addEventListener("change", function () {
    previewImage(this, "posterPreview");
});

document.getElementById("bannerInput").addEventListener("change", function () {
    previewImage(this, "bannerPreview");
});

function previewImage(input, previewId) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.getElementById(previewId);
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
}
document.querySelectorAll(".input-wrap input").forEach(input => {
    const counter = input.parentElement.querySelector(".counter");

    input.addEventListener("input", () => {
        counter.textContent = `${input.value.length} / ${input.maxLength}`;
    });
});
