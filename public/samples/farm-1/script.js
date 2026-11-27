const form = document.getElementById('signup');
const recap = document.getElementById('recap');
const confirmation = document.getElementById('confirm');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function firstPickup(weekStart) {
  const [y, m, d] = weekStart.split('-').map(Number);
  const thursday = new Date(Date.UTC(y, m - 1, d + 3));
  return `Thursday, ${MONTHS[thursday.getUTCMonth()]} ${thursday.getUTCDate()}`;
}

function choices() {
  const size = form.querySelector('input[name="size"]:checked');
  return {
    sizeName: size.dataset.name,
    price: size.dataset.price,
    pickup: firstPickup(form.elements.start.value),
  };
}

function updateRecap() {
  const { sizeName, price, pickup } = choices();
  recap.textContent = `${sizeName} at $${price} a week. Your first pickup is ${pickup}.`;
  confirmation.hidden = true;
}

form.addEventListener('change', updateRecap);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { sizeName, pickup } = choices();
  const firstName = form.elements.name.value.trim().split(/\s+/)[0];
  const message = `Thank you, ${firstName}. Your ${sizeName.toLowerCase()} starts ${pickup}. This is a sample site, so nothing was sent.`;
  confirmation.hidden = false;
  confirmation.textContent = '';
  requestAnimationFrame(() => { confirmation.textContent = message; });
});

updateRecap();
