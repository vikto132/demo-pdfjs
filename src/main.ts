import { readExcelFile } from "./excel";
import { file as pdf } from "./pdf";
import { b64toBlob } from "./util";

const embed = document.getElementById("pdf-embed") as HTMLIFrameElement;

const blob = b64toBlob(pdf, "application/pdf");
const blobUrl = URL.createObjectURL(blob);

embed.src = `/web/viewer.html?file=${blobUrl}`;

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

window.addEventListener("load", async () => {
  const excel = await readExcelFile();
  const excelEl = document.getElementById("excel");
  if (!excelEl) return;
  excelEl.innerHTML = excel;
  document.addEventListener("selectionchange", () => {
    const selection = document.getSelection();
    const div = document.getElementById("excel")!; // replace with your div's id
    if (!selection) return;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.commonAncestorContainer;

      if (div.contains(selectedNode)) {
        console.log("Selected text is within the div:", selection.toString());
      } else {
        console.log(
          "Selected text is not within the div:",
          selection.toString()
        );
      }
    }
  });
});
