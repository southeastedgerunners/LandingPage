import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Read from disk: Vitest stubs CSS imports (even `?raw`) as empty strings.
const stylesheets = Object.fromEntries(
  readdirSync(__dirname, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.css'))
    .map((file) => [file, readFileSync(join(__dirname, file), 'utf8')]),
);

function mediaQueries(css) {
  return [...css.matchAll(/@media([^{]+)\{/g)].map((match) => match[1].trim());
}

// Phone styles are the default; wider screens are added with min-width queries.
function capsWidth(query) {
  return /max-width|width\s*<|>=?\s*width/.test(query);
}

describe('stylesheets are mobile-first', () => {
  it('finds the stylesheets it checks', () => {
    const widthQueries = Object.values(stylesheets).flatMap(mediaQueries).filter((q) => q.includes('width'));
    expect(widthQueries.length).toBeGreaterThan(0);
  });

  it.each(Object.keys(stylesheets))('%s has no max-width media queries', (path) => {
    expect(mediaQueries(stylesheets[path]).filter(capsWidth)).toEqual([]);
  });
});
