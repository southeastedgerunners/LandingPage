import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import TawkWidget from './TawkWidget';

describe('TawkWidget placeholder', () => {
  it('loads no chat script and renders no chat controls', () => {
    const { container } = render(<TawkWidget />);
    expect(container.innerHTML).toBe('');
    expect(document.querySelector('script[src*="tawk.to"]')).toBeNull();
  });
});
