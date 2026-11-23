import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CallRequestProvider, useCallRequest } from './CallRequestContext';

function Opener() {
  const open = useCallRequest();
  return <button onClick={open}>Open call form</button>;
}

function renderProvider() {
  render(
    <CallRequestProvider>
      <Opener />
    </CallRequestProvider>,
  );
}

function nameField() {
  return screen.getByLabelText<HTMLInputElement>('Your Name');
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('CallRequestProvider', () => {
  it('keeps half-typed input when the dialog is closed and reopened', () => {
    renderProvider();
    fireEvent.click(screen.getByText('Open call form'));
    fireEvent.change(nameField(), { target: { value: 'Dana' } });
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    fireEvent.click(screen.getByText('Open call form'));
    expect(nameField().value).toBe('Dana');
  });

  it('starts with a fresh form after a successful send', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    renderProvider();
    fireEvent.click(screen.getByText('Open call form'));
    fireEvent.change(nameField(), { target: { value: 'Dana' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '6065551234' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Request a Call' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Done' }));
    fireEvent.click(screen.getByText('Open call form'));
    expect(nameField().value).toBe('');
  });
});
