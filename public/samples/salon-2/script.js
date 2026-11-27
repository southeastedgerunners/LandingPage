// Little Lacquer. The booking form's radios hold every choice; render() derives the rest of the page from them.
(() => {
  const root = document.documentElement;
  const form = document.getElementById('book-form');
  const confirmation = form.querySelector('.confirm');
  const fan = document.querySelector('.fan-svg');
  const note = fan.querySelector('.fan-note');
  const sticks = [...fan.querySelectorAll('.fan-stick')].sort((a, b) => a.dataset.shade.localeCompare(b.dataset.shade));
  const geo = Object.fromEntries(['rx', 'ry', 'start', 'step', 'mainScale', 'pulledAngle', 'pulledScale'].map((k) => [k, Number(fan.dataset[k])]));
  const recapTip = document.querySelector('.recap-tip');

  const checked = (name) => form.querySelector(`input[name="${name}"]:checked`);
  const minutes = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

  function bind(key, text) {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => { el.textContent = text; });
  }

  function stickTransform(stick, pulled, slot) {
    const isPulled = stick.dataset.shade === pulled;
    const angle = isPulled ? geo.pulledAngle : geo.start + slot * geo.step;
    const scale = isPulled ? geo.pulledScale : geo.mainScale;
    return `translate(${geo.rx}px, ${geo.ry}px) rotate(${angle}deg) scale(${scale})`;
  }

  // The pulled stick leaves the fan and the rest close up in number order, as fan.py draws them.
  function arrangeFan(pulled) {
    const order = [...sticks.filter((s) => s.dataset.shade !== pulled), sticks.find((s) => s.dataset.shade === pulled)];
    order.forEach((s) => fan.insertBefore(s, note));
    fan.getBoundingClientRect(); // moved sticks get their old transform back in layout, so the change below animates
    order.forEach((s, slot) => {
      const isPulled = s.dataset.shade === pulled;
      s.style.transform = stickTransform(s, pulled, slot);
      s.classList.toggle('is-pulled', isPulled);
      s.firstElementChild.setAttribute('filter', `url(#ll${isPulled ? 'lift' : 'sh'})`);
      s.querySelector('text').setAttribute('font-size', (isPulled ? 14 / geo.pulledScale : 13 / geo.mainScale).toFixed(2));
      s.querySelector('tspan').textContent = isPulled ? `NO. ${s.dataset.shade}` : s.dataset.shade;
    });
    note.style.display = pulled === '07' ? '' : 'none';
  }

  function paintRecapTip(num, name) {
    const source = fan.querySelector(`.fan-stick[data-shade="${num}"] path:nth-of-type(2)`);
    const tip = recapTip.querySelector('path:nth-of-type(2)');
    tip.setAttribute('fill', source.getAttribute('fill'));
    tip.setAttribute('stroke', source.getAttribute('stroke'));
    const label = recapTip.querySelector('text');
    label.firstElementChild.textContent = `NO. ${num}`;
    label.lastChild.textContent = ` ${name.toUpperCase()}`;
  }

  // A time is open when the chosen service ends by closing time on the chosen day.
  function updateTimes() {
    const day = checked('day');
    const length = Number(checked('service').dataset.minutes);
    const times = [...form.querySelectorAll('input[name="time"]')];
    times.forEach((t) => { t.disabled = minutes(t.dataset.starts) + length > minutes(day.dataset.closes); });
    const current = checked('time');
    if (current && current.disabled) {
      const open = times.filter((t) => !t.disabled);
      (open.reverse().find((t) => minutes(t.dataset.starts) < minutes(current.dataset.starts)) || open[0]).checked = true;
    }
  }

  function render() {
    updateTimes();
    const shade = checked('shade');
    const service = checked('service');
    const day = checked('day');
    root.dataset.shade = shade.value;
    bind('shade-name', shade.dataset.name);
    bind('service-name', service.dataset.name);
    bind('service-lower', service.dataset.name.toLowerCase());
    bind('price', `$${service.dataset.price}`);
    bind('day-name', day.dataset.day);
    bind('day-num', day.value);
    bind('time', checked('time').value);
    document.querySelectorAll('.service-list li').forEach((li) => li.classList.toggle('is-chosen', li.dataset.service === service.value));
    arrangeFan(shade.value);
    fan.setAttribute('aria-label', `A swatch fan of eight shades with ${shade.dataset.name} pulled out`);
    paintRecapTip(shade.value, shade.dataset.name);
    form.querySelectorAll('input[name="shade"]').forEach((r) => {
      r.closest('.swatch').querySelector('tspan').textContent = r.checked ? `NO. ${r.value}` : r.value;
    });
  }

  sticks.forEach((s) => s.addEventListener('click', () => {
    form.querySelector(`input[name="shade"][value="${s.dataset.shade}"]`).checked = true;
    render();
  }));

  form.addEventListener('change', () => {
    confirmation.hidden = true;
    render();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const first = form.elements.namedItem('name').value.trim().split(/\s+/)[0];
    confirmation.textContent = `Thanks${first ? `, ${first}` : ''}. This is a sample site, so nothing was sent and no appointment was made.`;
    confirmation.hidden = false;
  });

  render();
})();
