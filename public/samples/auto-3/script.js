const PHONE = '(606) 555-0134';

const SCHEDULE = {
  tue: { name: 'Tuesday', short: 'Tue', times: ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'], taken: ['9:30', '2:30'] },
  wed: { name: 'Wednesday', short: 'Wed', times: ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'], taken: ['8:00', '1:00'] },
  thu: { name: 'Thursday', short: 'Thu', times: ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'], taken: ['11:00', '2:30', '4:00'] },
  fri: { name: 'Friday', short: 'Fri', times: ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'], taken: ['9:30'] },
  sat: { name: 'Saturday', short: 'Sat', times: ['7:00', '8:00', '9:00', '10:00', '11:00'], taken: ['8:00', '9:00'] },
};

const form = document.querySelector('[data-booking]');
const bookingFringe = form.querySelector('[data-fringe="booking"]');
const recap = form.querySelector('[data-recap]');
const confirmNote = form.querySelector('[data-confirm]');
const heroFringe = document.querySelector('[data-fringe="hero"]');
const heroLabel = document.querySelector('[data-hero-label]');
const heroBook = document.querySelector('[data-hero-book]');

function tabMarkup(name, day, time, taken, stub) {
  if (taken) {
    return `<label class="tab is-torn stub-${stub}"><input type="radio" name="${name}" value="${time}" aria-label="${day.name} ${time}, taken" disabled></label>`;
  }
  return `<label class="tab"><input type="radio" name="${name}" value="${time}" aria-label="${day.name} ${time}">`
    + `<span class="tab-text" aria-hidden="true"><span class="tab-time">${day.short.toUpperCase()} ${time}</span>`
    + `<span class="tab-phone">${PHONE}</span></span></label>`;
}

function renderBookingFringe(dayId, wantedTime) {
  const day = SCHEDULE[dayId];
  const open = day.times.filter((t) => !day.taken.includes(t));
  const picked = open.includes(wantedTime) ? wantedTime : open[0];
  let torn = 0;
  bookingFringe.innerHTML = day.times
    .map((t) => {
      const taken = day.taken.includes(t);
      return tabMarkup('time', day, t, taken, taken && torn++ % 2 ? 'b' : 'a');
    })
    .join('');
  bookingFringe.querySelector(`input[value="${picked}"]`).checked = true;
}

function updateRecap() {
  const day = SCHEDULE[form.elements.day.value];
  recap.textContent = `${day.short} ${form.elements.time.value}, ${form.elements.vehicle.value}`;
  confirmNote.hidden = true;
}

function updateHeroLabel() {
  heroLabel.textContent = `Book Tuesday ${heroFringe.querySelector('input:checked').value}`;
}

heroFringe.addEventListener('change', updateHeroLabel);

heroBook.addEventListener('click', () => {
  form.querySelector('input[name="day"][value="tue"]').checked = true;
  renderBookingFringe('tue', heroFringe.querySelector('input:checked').value);
  updateRecap();
});

form.addEventListener('change', (event) => {
  if (event.target.name === 'day') {
    renderBookingFringe(event.target.value, form.elements.time.value);
  }
  updateRecap();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const day = SCHEDULE[form.elements.day.value];
  confirmNote.textContent = `Torn off and noted for ${day.name} ${form.elements.time.value}, ${form.elements.vehicle.value}. `
    + 'This is a sample site, so nothing was sent and nobody will call.';
  confirmNote.hidden = false;
});
