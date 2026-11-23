import type { ReactNode } from 'react';
import './Placeholder.css';

/**
 * Visible stand-in for content the owner still has to supply.
 * Every use is listed in PLACEHOLDERS.md. Remove the component once all are filled.
 */
function Placeholder({ children, block = false }: { children: ReactNode; block?: boolean }) {
  const Tag = block ? 'p' : 'span';
  return <Tag className={block ? 'placeholder placeholder--block' : 'placeholder'}>[PLACEHOLDER: {children}]</Tag>;
}

export default Placeholder;
