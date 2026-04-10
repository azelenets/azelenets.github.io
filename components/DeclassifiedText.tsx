import type { JSX } from 'react';

const WORD_DELAY = 20;

type DeclassifiedTextProps = {
  text: string;
  startMs: number;
  active: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const DeclassifiedText = ({ text, startMs = 0, active, as: Wrapper, className }: DeclassifiedTextProps) => {
  const tokens = text.split(/(\s+)/);
  let wordIdx = 0;

  const nodes = tokens.map((token, i) => {
    if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
    const delay = startMs + wordIdx++ * WORD_DELAY;
    return (
      <span
        key={i}
        className={active ? 'declassify-char' : 'declassify-pending'}
        style={active ? { animationDelay: `${delay}ms` } : undefined}
        onAnimationEnd={(e) => {
          (e.currentTarget.firstElementChild as HTMLElement | null)?.classList.add('declassify-done');
        }}
      >
        <span className="declassify-block">{token}</span>
      </span>
    );
  });

  return Wrapper ? <Wrapper className={className}>{nodes}</Wrapper> : <>{nodes}</>;
};

export default DeclassifiedText;
