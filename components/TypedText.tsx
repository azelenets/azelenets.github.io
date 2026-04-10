import type { JSX } from 'react';
import { useEffect, useState } from 'react';

type TypedTextProps = {
  text: string;
  active: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  duration?: number; // in milliseconds, defaults to 1400ms (2 seconds) if not provided by the caller.
};

const TypedText = ({ text, active, as: Wrapper = 'span', className, duration = 1400 }: TypedTextProps) => {
  const [displayed, setDisplayed] = useState('_');

  useEffect(() => {
    if (!active) return;
    const delay = duration / text.length;
    const ids = text.split('').map((_, i) =>
      setTimeout(() => setDisplayed(text.slice(0, i + 1)), i * delay),
    );
    return () => ids.forEach(clearTimeout);
  }, [active, text]);

  return <Wrapper className={className}>{displayed}</Wrapper>;
};

export default TypedText;
