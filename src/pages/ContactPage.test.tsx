import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';
import QuickContactPage from './QuickContactPage';

describe('standalone contact pages', () => {
  it('render the intake form inline with a page heading, not a dialog', () => {
    render(<MemoryRouter><ContactPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Free Business Intake' })).toBeTruthy();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('render the call form inline with a page heading, not a dialog', () => {
    render(<MemoryRouter><QuickContactPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Request a Call' })).toBeTruthy();
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
