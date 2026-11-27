import { describe, expect, it } from 'vitest';
import { formatPhone, isCompletePhone } from './phone';

describe('formatPhone', () => {
  it('leaves up to three digits bare', () => {
    expect(formatPhone('60')).toBe('60');
    expect(formatPhone('606')).toBe('606');
  });

  it('adds the area-code parentheses after three digits', () => {
    expect(formatPhone('6065')).toBe('(606) 5');
  });

  it('formats a full number and strips non-digits', () => {
    expect(formatPhone('606.555.1234')).toBe('(606) 555-1234');
  });

  it('drops digits past ten', () => {
    expect(formatPhone('60655512349999')).toBe('(606) 555-1234');
  });
});

describe('isCompletePhone', () => {
  it('needs exactly ten digits', () => {
    expect(isCompletePhone('(606) 555-123')).toBe(false);
    expect(isCompletePhone('(606) 555-1234')).toBe(true);
  });
});
