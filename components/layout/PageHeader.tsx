import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  titleMain: string;
  titleAccent?: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, titleMain, titleAccent, description }) => {
  return (
    <header className="mb-16 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-8">
        <div>
          {eyebrow && (
            <p className="text-primary text-xs font-bold mb-2 tracking-[0.4em] uppercase">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
            {titleMain}
            {titleAccent && (
              <>
                {' '}<span className="text-primary font-light">&#47;&#47;</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">{titleAccent}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase pt-2">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
