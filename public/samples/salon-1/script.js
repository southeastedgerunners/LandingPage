const DAYS = {
  fri: { name: 'Friday', times: ['2:30', '3:15', '5:00'] },
  sat: { name: 'Saturday', times: ['10:30', '1:00', '4:45'] },
  tue: { name: 'Tuesday', times: ['11:00', '2:30', '5:30'] },
  wed: { name: 'Wednesday', times: ['10:00', '12:15', '3:45'] },
  thu: { name: 'Thursday', times: ['1:30', '3:00', '6:00'] },
};

const form = document.getElementById('book-form');
const service = document.getElementById('service');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const confirmLine = form.querySelector('.confirm');
const timeRadios = [...form.querySelectorAll('input[name="time"]')];

const checked = (scope, name) => scope.querySelector(`input[name="${name}"]:checked`);
const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((el) => { el.textContent = text; });
};

function renderRecap() {
  const day = DAYS[checked(form, 'day').value];
  const firstName = nameInput.value.trim().split(/\s+/)[0];
  const phone = phoneInput.value.trim();
  setText('[data-day]', day.name);
  setText('[data-day-upper]', day.name.toUpperCase());
  setText('[data-time]', checked(form, 'time').value);
  setText('[data-name]', firstName || 'you');
  setText('[data-phone]', phone || 'you');
  confirmLine.hidden = true;
}

function showDay(dayKey) {
  DAYS[dayKey].times.forEach((time, i) => {
    timeRadios[i].value = time;
    timeRadios[i].nextElementSibling.querySelector('.chip-text').textContent = time;
  });
  renderRecap();
}

form.addEventListener('change', (event) => {
  const { name, value } = event.target;
  if (name === 'day') showDay(value);
  else if (name === 'service') {
    service.nextElementSibling.textContent = service.selectedOptions[0].dataset.price;
    const set = document.querySelector(`input[name="set"][value="${value}"]`);
    if (set) set.checked = true;
    confirmLine.hidden = true;
  } else renderRecap();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const day = DAYS[checked(form, 'day').value].name;
  const time = checked(form, 'time').value;
  const firstName = nameInput.value.trim().split(/\s+/)[0];
  confirmLine.textContent = `You're on the card for ${day} at ${time}, ${firstName}. This is a sample site, so nothing was sent and no time is held.`;
  confirmLine.hidden = false;
});

document.querySelector('.set-list').addEventListener('change', (event) => {
  service.value = event.target.value;
  service.dispatchEvent(new Event('change', { bubbles: true }));
});

const today = document.querySelector('.today');


today.addEventListener('change', (event) => {
  setText('[data-today-time]', event.target.value);
});

today.addEventListener('submit', (event) => {
  event.preventDefault();
  const time = checked(today, 'today-time').value;
  form.querySelector('input[name="day"][value="fri"]').checked = true;
  showDay('fri');
  timeRadios.find((radio) => radio.value === time).checked = true;
  renderRecap();
  document.getElementById('book').scrollIntoView({ block: 'start' });
  document.getElementById('book-title').focus({ preventScroll: true });
});
