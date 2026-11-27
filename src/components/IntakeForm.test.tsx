import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import IntakeForm from './IntakeForm';

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillRequired() {
  fill('Your Name', 'Dana');
  fill('Business Name', 'Acme Roofing');
  fill('Phone Number', '6065551234');
  fill('Email Address', 'dana@acmeroofing.com');
  fill('How can we help?', 'Missed-call text back');
  fireEvent.click(screen.getByRole('checkbox'));
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Send intake form' }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('IntakeForm', () => {
  it('rejects a malformed email with a specific message and focuses that field', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<IntakeForm headingId="h" onDone={() => {}} />);
    fillRequired();
    fill('Email Address', 'dana@');
    submit();
    expect(screen.getByText('Enter an email address like name@example.com.')).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByLabelText('Email Address'));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('treats website and industry as optional', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchSpy);
    render(<IntakeForm headingId="h" onDone={() => {}} />);
    fillRequired();
    submit();
    expect(screen.getByLabelText('Website (optional)').getAttribute('aria-invalid')).toBeNull();
    expect(await screen.findByRole('heading', { name: /we've got it/i })).toBeTruthy();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
