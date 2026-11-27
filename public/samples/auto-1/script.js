(() => {
  const form = document.getElementById('booking-form');
  const confirm = document.getElementById('confirm');
  const dayInputs = [...form.querySelectorAll('input[name="day"]')];

  const dow = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const longDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const isoDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const parseIso = (value) => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  function nextWeekdays(from, count) {
    const days = [];
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    while (days.length < count) {
      d.setDate(d.getDate() + 1);
      const weekday = d.getDay();
      if (weekday !== 0 && weekday !== 6) days.push(new Date(d));
    }
    return days;
  }

  nextWeekdays(new Date(), dayInputs.length).forEach((date, i) => {
    const input = dayInputs[i];
    const label = input.closest('.day');
    input.value = isoDate(date);
    label.querySelector('.day-dow').textContent = dow.format(date).toUpperCase();
    label.querySelector('.day-date').textContent = String(date.getDate());
    label.querySelector('.day-month').textContent = month.format(date);
  });

  function renderConfirmation() {
    const data = new FormData(form);
    const vehicle = ['year', 'make', 'model']
      .map((key) => String(data.get(key) || '').trim())
      .filter(Boolean)
      .join(' ');
    const day = data.get('day');
    const when = day ? ` is down for ${longDay.format(parseIso(String(day)))}` : ' is on our list';

    const lead = document.createElement('strong');
    lead.textContent = 'Got it.';
    confirm.replaceChildren(
      lead,
      ` Your ${vehicle || 'car'}${when}. This is a sample site for a fictional shop, so nothing was sent.`
    );
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderConfirmation();
    confirm.hidden = false;
  });

  form.addEventListener('input', () => {
    if (!confirm.hidden) renderConfirmation();
  });
})();
