import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CallRequestForm from './CallRequestForm';

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Dana' } });
  fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '6065551234' } });
  fireEvent.click(screen.getByRole('checkbox'));
}

function submitButton() {
  return screen.getByRole('button', { name: /request a call/i });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('CallRequestForm', () => {
  it('formats the phone number as it is typed', () => {
    render(<CallRequestForm headingId="h" onDone={() => {}} />);
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '6065551234' } });
    expect(screen.getByLabelText<HTMLInputElement>('Phone Number').value).toBe('(606) 555-1234');
  });

  it('keeps the submit button usable and shows no errors before a send attempt', () => {
    render(<CallRequestForm headingId="h" onDone={() => {}} />);
    expect(submitButton()).toHaveProperty('disabled', false);
    expect(screen.queryByText('Enter your name.')).toBeNull();
  });

  it('on a send with gaps, marks each problem field and focuses the first one', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<CallRequestForm headingId="h" onDone={() => {}} />);
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Dana' } });
    fireEvent.click(submitButton());

    const phone = screen.getByLabelText('Phone Number');
    expect(phone.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById(phone.getAttribute('aria-describedby')!)?.textContent)
      .toBe('Enter a 10‑digit phone number.');
    expect(screen.getByRole('checkbox').getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByLabelText('Your Name').getAttribute('aria-invalid')).toBeNull();
    expect(document.activeElement).toBe(phone);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows the success screen after a good response and focuses its heading', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const onDone = vi.fn();
    render(<CallRequestForm headingId="h" onDone={onDone} />);
    fillValidForm();
    fireEvent.click(submitButton());
    const done = await screen.findByRole('button', { name: 'Done' });
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: /call you soon/i }));
    fireEvent.click(done);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('announces an error with an email fallback and keeps the input when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<CallRequestForm headingId="h" onDone={() => {}} />);
    fillValidForm();
    fireEvent.click(submitButton());
    const alert = await screen.findByRole('alert');
    expect(alert.querySelector('a')?.getAttribute('href')).toBe('mailto:southeast.edgerunners@gmail.com');
    expect(screen.getByLabelText<HTMLInputElement>('Your Name').value).toBe('Dana');
  });
});
