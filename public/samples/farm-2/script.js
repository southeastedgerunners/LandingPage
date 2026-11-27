const form = document.getElementById("ticket");
const recap = document.getElementById("recap");
const status = document.getElementById("ticket-status");

function firstBoxLine() {
  const start = form.elements.start.value;
  const atStand = form.elements.handoff.value === "pickup" ? " at the stand" : "";
  return `Your first box is ready ${start}${atStand}.`;
}

form.addEventListener("change", () => {
  recap.textContent = firstBoxLine();
  status.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim().split(/\s+/)[0];
  status.textContent = `Thanks, ${name}. ${firstBoxLine()} This is a sample site, so nothing was sent.`;
});
