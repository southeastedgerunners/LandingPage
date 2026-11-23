import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

function renderModal(isOpen: boolean, onClose = vi.fn()) {
  render(
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="t">
      <h2 id="t">Title</h2>
      <p>Body text</p>
      <label htmlFor="f">Field</label>
      <input id="f" />
    </Modal>,
  );
  return onClose;
}

describe('Modal', () => {
  it('opens as a labelled dialog when isOpen is true', () => {
    renderModal(true);
    const dialog = screen.getByRole('dialog', { name: 'Title' });
    expect(dialog.hasAttribute('open')).toBe(true);
  });

  it('puts focus on the first field when it opens', () => {
    renderModal(true);
    expect(document.activeElement).toBe(screen.getByLabelText('Field'));
  });

  it('keeps its content mounted while closed, so typed input survives a close', () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} labelledBy="t">
        <h2 id="t">Title</h2>
        <label htmlFor="f">Field</label>
        <input id="f" />
      </Modal>,
    );
    fireEvent.change(screen.getByLabelText('Field'), { target: { value: 'half typed' } });
    rerender(
      <Modal isOpen={false} onClose={() => {}} labelledBy="t">
        <h2 id="t">Title</h2>
        <label htmlFor="f">Field</label>
        <input id="f" />
      </Modal>,
    );
    expect(screen.getByRole('dialog', { hidden: true }).hasAttribute('open')).toBe(false);
    expect(screen.getByLabelText<HTMLInputElement>('Field').value).toBe('half typed');
  });

  it('asks the parent to close on Escape (the dialog cancel event)', () => {
    const onClose = renderModal(true);
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on a backdrop click but not on a click inside the content', () => {
    const onClose = renderModal(true);
    fireEvent.click(screen.getByText('Body text'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the close button', () => {
    const onClose = renderModal(true);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
