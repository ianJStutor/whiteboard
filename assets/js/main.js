//DOM elements
const header = document.querySelector("header");
const [color, penSize, eraserSize] = document.querySelectorAll("fieldset > input");

//remove header
document.addEventListener("click", () => header.classList.add("hide"), {once: true});

//color changing
document.querySelectorAll("[id|='color']").forEach(b => {
    b.addEventListener("click", () => color.value=b.dataset.color);
});

//keyboard shortcuts
window.addEventListener("keyup", handleKeyup);

function handleKeyup({ key }) {
    const k = key.toLowerCase();
    if (k === "x") { //swap tools
        return document.querySelector("[type='radio']:not(:checked)").click();
    }
    const el = document.querySelector(`[data-key="${k}"]`);
    if (!el) return;
    el.click();
}
