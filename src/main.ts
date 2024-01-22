const embed = document.getElementById("pdf-embed") as HTMLIFrameElement;
embed.src = "/web/viewer.html?file=/assets/test.pdf";

let selectedInput: HTMLInputElement | null = null;
window.addEventListener(
  "message",
  (event) => {
    if (event.source === embed.contentWindow) {
      if (selectedInput != null) {
        selectedInput.value = event.data.text;
      }
    }
  },
  false
);

document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("click", () => {
    selectedInput = input as HTMLInputElement;
  });
});
document.addEventListener("click", (event) => {
  if (event.target !== selectedInput) {
    selectedInput = null;
  }
});