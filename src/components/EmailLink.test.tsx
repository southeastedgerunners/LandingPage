import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmailLink from './EmailLink';

describe('EmailLink', () => {
  it('links to the contact email and reads as the plain address', () => {
    render(<EmailLink className="inline-link" />);
    const link = screen.getByRole('link', { name: 'southeast.edgerunners@gmail.com' });
    expect(link.getAttribute('href')).toBe('mailto:southeast.edgerunners@gmail.com');
    expect(link.className).toBe('inline-link');
  });

  it('offers a line break only before the @', () => {
    render(<EmailLink />);
    const link = screen.getByRole('link');
    expect(link.innerHTML).toBe('southeast.edgerunners<wbr>@gmail.com');
  });
});
