import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Netlify deploys every file in netlify/functions as a function and rejects
// names with anything but letters, digits, hyphens or underscores.
const functionsDir = join(__dirname, '..', 'functions');

describe('netlify/functions', () => {
  it('holds only files Netlify can deploy as functions', () => {
    const names = readdirSync(functionsDir).map((file) => file.replace(/\.(mjs|js|cjs|ts|mts)$/, ''));
    expect(names.length).toBeGreaterThan(0);
    expect(names.filter((name) => !/^[A-Za-z0-9_-]+$/.test(name))).toEqual([]);
  });
});
