import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import './BookingModal.css';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BookingFormData = {
  name: string;
  phone: string;
  email: string;
  businessName: string;
};

type AvailabilitySlot = {
  start: string;
  end: string;
  label: string;
  available: boolean;
};

type AvailabilityDay = {
  date: string;
  slots: AvailabilitySlot[];
};

type AvailabilityPayload = {
  timezone: string;
  days: AvailabilityDay[];
};

const initialFormData: BookingFormData = {
  name: '',
  phone: '',
  email: '',
  businessName: '',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function formatDateLabel(dateKey: string): string {
  return dayjs(dateKey).format('dddd, MMMM D');
}

function formatTimeLabel(slot: AvailabilitySlot, timezone: string): string {
  if (slot.label) {
    return slot.label;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  }).format(new Date(slot.start));
}

function buildApiUrl(path: string): string {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const normalizedBaseUrl = configuredBaseUrl ? configuredBaseUrl.replace(/\/+$/, '') : '';
  return `${normalizedBaseUrl}${path}`;
}

function normalizeAvailabilityPayload(payload: unknown): AvailabilityPayload {
  if (!isRecord(payload) || !Array.isArray(payload.days)) {
    throw new Error('Availability must return { days: [...] }.');
  }

  const days = payload.days.flatMap((day) => {
    if (!isRecord(day) || typeof day.date !== 'string' || !Array.isArray(day.slots)) {
      return [];
    }

    const slots = day.slots
      .flatMap((slot) => {
        if (
          !isRecord(slot) ||
          typeof slot.start !== 'string' ||
          typeof slot.end !== 'string' ||
          typeof slot.available !== 'boolean'
        ) {
          return [];
        }

        if (Number.isNaN(new Date(slot.start).getTime()) || Number.isNaN(new Date(slot.end).getTime())) {
          return [];
        }

        return [
          {
            start: slot.start,
            end: slot.end,
            label: typeof slot.label === 'string' ? slot.label : '',
            available: slot.available,
          },
        ];
      })
      .sort((left, right) => new Date(left.start).getTime() - new Date(right.start).getTime());

    return [
      {
        date: day.date,
        slots,
      },
    ];
  });

  return {
    timezone: typeof payload.timezone === 'string' && payload.timezone ? payload.timezone : 'UTC',
    days,
  };
}

function hasAvailableSlots(day: AvailabilityDay | undefined): boolean {
  return Boolean(day?.slots.some((slot) => slot.available));
}

function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [visibleMonth, setVisibleMonth] = useState(() => dayjs().startOf('month'));
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const [availabilityTimezone, setAvailabilityTimezone] = useState('UTC');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSlotStart, setSelectedSlotStart] = useState('');
  const [availabilityState, setAvailabilityState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    'idle'
  );
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const availabilityUrl = useMemo(() => buildApiUrl('/api/booking/availability'), []);
  const bookingUrl = useMemo(() => buildApiUrl('/api/booking/requests'), []);
  const calendarTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#00b5c9' },
          secondary: { main: '#ff2d8a' },
          background: { default: '#2b2b2b', paper: '#353535' },
          text: { primary: '#e6e6e6', secondary: '#b6b6b6' },
        },
      }),
    []
  );

  const availabilityByDate = useMemo(
    () => new Map(availabilityDays.map((day) => [day.date, day])),
    [availabilityDays]
  );
  const selectedDateKey = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
  const selectedDaySlots = selectedDateKey ? availabilityByDate.get(selectedDateKey)?.slots ?? [] : [];
  const selectedSlot =
    selectedDaySlots.find((slot) => slot.start === selectedSlotStart && slot.available) ??
    selectedDaySlots.find((slot) => slot.available) ??
    null;

  const minAvailableDate = useMemo(() => {
    const firstAvailableDay = availabilityDays.find((day) => hasAvailableSlots(day));
    return firstAvailableDay ? dayjs(firstAvailableDay.date) : null;
  }, [availabilityDays]);

  const maxAvailableDate = useMemo(() => {
    const lastAvailableDay = [...availabilityDays].reverse().find((day) => hasAvailableSlots(day));
    return lastAvailableDay ? dayjs(lastAvailableDay.date) : null;
  }, [availabilityDays]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitState('idle');
      setSubmitMessage('');
      setSelectedSlotStart('');
      return;
    }

    const controller = new AbortController();

    async function loadAvailability() {
      setAvailabilityState('loading');
      setAvailabilityMessage('');

      try {
        const response = await fetch(availabilityUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          const detail = await response.text();
          throw new Error(detail || 'Failed to load availability from the booking API.');
        }

        const payload: unknown = await response.json();
        const normalizedPayload = normalizeAvailabilityPayload(payload);
        const nextDays = normalizedPayload.days;
        setAvailabilityDays(nextDays);
        setAvailabilityTimezone(normalizedPayload.timezone);
        setAvailabilityState('ready');

        const firstAvailableDay = nextDays.find((day) => hasAvailableSlots(day));
        if (!firstAvailableDay) {
          setAvailabilityMessage('No bookable consultation times are currently available.');
          setSelectedDate(null);
          setSelectedSlotStart('');
          return;
        }

        const firstAvailableDate = dayjs(firstAvailableDay.date);
        setSelectedDate(firstAvailableDate);
        setVisibleMonth(firstAvailableDate.startOf('month'));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setAvailabilityState('error');
        setAvailabilityMessage(error instanceof Error ? error.message : 'Failed to load availability.');
        setAvailabilityDays([]);
        setAvailabilityTimezone('UTC');
        setSelectedDate(null);
        setSelectedSlotStart('');
      }
    }

    void loadAvailability();

    return () => {
      controller.abort();
    };
  }, [availabilityUrl, isOpen]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedSlotStart('');
      return;
    }

    const firstAvailableSlot = selectedDaySlots.find((slot) => slot.available);
    setSelectedSlotStart(firstAvailableSlot?.start ?? '');
  }, [selectedDate, selectedDateKey, selectedDaySlots]);

  if (!isOpen) {
    return null;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlot) {
      setSubmitState('error');
      setSubmitMessage('Pick an available consultation time before submitting the form.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(bookingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          timezone: availabilityTimezone,
          source: 'website-consultation-form',
          contact: formData,
          appointment: {
            start: selectedSlot.start,
            end: selectedSlot.end,
            label: formatTimeLabel(selectedSlot, availabilityTimezone),
            dateLabel: selectedDateKey ? formatDateLabel(selectedDateKey) : '',
          },
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || 'The booking API rejected the consultation request.');
      }

      setSubmitState('success');
      setSubmitMessage(
        'Request sent. We will review the appointment, add it to the calendar after approval, and send confirmation to the customer.'
      );
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Something went wrong while sending the request.'
      );
    }
  }

  return (
    <div
      className="booking-modal__backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="booking-modal__header">
          <div>
            <p className="booking-modal__eyebrow">Book a consultation</p>
            <h2 id="booking-modal-title">Choose a time and send your request</h2>
            <p className="booking-modal__intro">
              Pick an available slot, then we will send the request into n8n for approval,
              scheduling, and follow-up.
            </p>
          </div>
          <button type="button" className="booking-modal__close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="booking-modal__content">
          <section className="booking-modal__panel booking-modal__panel--calendar">
            <div className="booking-modal__section-header">
              <h3>Select a month and day</h3>
                <p className="booking-modal__section-copy">
                  The booking API loads your blocked Google Calendar times from n8n, then calculates
                  the available and unavailable appointment slots for each day.
                </p>
            </div>

            {availabilityState === 'loading' ? (
              <p className="booking-modal__status booking-modal__status--info">
                Loading availability...
              </p>
            ) : null}

            {availabilityMessage ? (
              <p
                className={`booking-modal__status ${
                  availabilityState === 'error'
                    ? 'booking-modal__status--error'
                    : 'booking-modal__status--info'
                }`}
              >
                {availabilityMessage}
              </p>
            ) : null}

            <ThemeProvider theme={calendarTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="booking-modal__calendar-shell">
                  <DateCalendar
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue ? newValue.startOf('day') : null)}
                    onMonthChange={(newMonth) => setVisibleMonth(newMonth.startOf('month'))}
                    referenceDate={visibleMonth}
                    minDate={minAvailableDate ?? undefined}
                    maxDate={maxAvailableDate ?? undefined}
                    shouldDisableDate={(date) => {
                      const dateKey = date.format('YYYY-MM-DD');
                      return !hasAvailableSlots(availabilityByDate.get(dateKey));
                    }}
                    reduceAnimations
                    className="booking-modal__calendar"
                    sx={{
                      width: '100%',
                      maxWidth: 300,
                      margin: 0,
                      color: 'var(--color-text)',
                      '& .MuiPickersCalendarHeader-label': {
                        color: 'var(--color-text)',
                        fontWeight: 600,
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        color: 'var(--color-muted)',
                      },
                      '& .MuiPickersArrowSwitcher-button': {
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      },
                      '& .MuiPickersDay-root': {
                        color: 'var(--color-text)',
                        borderRadius: '14px',
                        border: '1px solid transparent',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        transition:
                          'transform 150ms ease, background-color 150ms ease, border-color 150ms ease',
                      },
                      '& .MuiPickersDay-root:hover': {
                        backgroundColor: 'rgba(0, 181, 201, 0.16)',
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        background:
                          'linear-gradient(135deg, rgba(0, 181, 201, 0.9), rgba(0, 120, 160, 0.9))',
                        color: '#ffffff',
                      },
                      '& .MuiPickersDay-root.Mui-disabled': {
                        color: 'rgba(255, 255, 255, 0.28)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      },
                      '& .Mui-selected:hover': {
                        background:
                          'linear-gradient(135deg, rgba(0, 181, 201, 0.9), rgba(0, 120, 160, 0.9))',
                      },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </ThemeProvider>
          </section>

          <section className="booking-modal__panel booking-modal__panel--times">
            <div className="booking-modal__section-header">
              <h3>{selectedDateKey ? formatDateLabel(selectedDateKey) : 'Choose a day first'}</h3>
              <p className="booking-modal__section-copy">Times are shown in {availabilityTimezone}.</p>
            </div>

            <div className="booking-modal__time-grid" role="list" aria-label="Available time slots">
              {selectedDaySlots.map((slot) => {
                const isSelected = slot.start === selectedSlotStart && slot.available;

                return (
                  <button
                    key={slot.start}
                    type="button"
                    role="listitem"
                    className={[
                      'booking-modal__time-slot',
                      !slot.available ? 'booking-modal__time-slot--disabled' : '',
                      isSelected ? 'booking-modal__time-slot--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setSelectedSlotStart(slot.start)}
                    disabled={!slot.available}
                  >
                     {formatTimeLabel(slot, availabilityTimezone)}
                   </button>
                 );
               })}

              {selectedDate && selectedDaySlots.length === 0 && availabilityState === 'ready' ? (
                <p className="booking-modal__empty">No time slots are available for that date.</p>
              ) : null}
            </div>
          </section>

          <section className="booking-modal__panel booking-modal__panel--form booking-modal__fullwidth">
            <div className="booking-modal__section-header">
              <h3>Your details</h3>
              <p className="booking-modal__section-copy">
                We use this information to log the lead in Google Sheets and coordinate approval.
              </p>
            </div>

            <form className="booking-modal__form" onSubmit={handleSubmit}>
              <label className="booking-modal__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="booking-modal__field">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="booking-modal__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="booking-modal__field">
                <span>Business name</span>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  autoComplete="organization"
                  required
                />
              </label>

              <div className="booking-modal__summary booking-modal__fullwidth">
                <h4>Request summary</h4>
                  <p>
                    {selectedSlot
                      ? `${selectedDateKey ? formatDateLabel(selectedDateKey) : ''} at ${formatTimeLabel(selectedSlot, availabilityTimezone)}`
                      : 'Select a date and time to continue.'}
                  </p>
              </div>

              {submitMessage ? (
                <p
                  className={`booking-modal__status ${
                    submitState === 'error'
                      ? 'booking-modal__status--error'
                      : submitState === 'success'
                        ? 'booking-modal__status--success'
                        : 'booking-modal__status--info'
                  }`}
                  aria-live="polite"
                >
                  {submitMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="booking-modal__submit booking-modal__fullwidth"
                disabled={
                  submitState === 'submitting' ||
                  availabilityState !== 'ready' ||
                  !selectedSlot
                }
              >
                {submitState === 'submitting' ? 'Sending request...' : 'Send consultation request'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
