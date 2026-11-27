const form = document.getElementById("order-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const firstName = String(data.get("name") || "").trim().split(/\s+/)[0];
  const day = data.get("day");
  const greeting = firstName ? `Got it, ${firstName}.` : "Got it.";
  const when = day ? `a ${day} drop-off` : "a drop-off time";
  note.textContent = `${greeting} Renee will call you to set ${when}. This is a sample site, so nothing was sent.`;
});
