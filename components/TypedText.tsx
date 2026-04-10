import type { JSX } from 'react';
import { useEffect, useState } from 'react';

const TYPED_DURATION = 1400;

type TypedTextProps = {
  text: string;
  active: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const TypedText = ({ text, active, as: Wrapper = 'span', className }: TypedTextProps) => {
  const [displayed, setDisplayed] = useState('_');

  useEffect(() => {
    if (!active) return;
    const delay = TYPED_DURATION / text.length;
    const ids = text.split('').map((_, i) =>
      setTimeout(() => setDisplayed(text.slice(0, i + 1)), i * delay),
    );
    return () => ids.forEach(clearTimeout);
  }, [active, text]);

  return <Wrapper className={className}>{displayed}</Wrapper>;
};

export default TypedText;
