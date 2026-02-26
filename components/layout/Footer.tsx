import { memo } from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-primary/20 bg-black/80 p-6 z-50">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-8">
        <div className="flex gap-12">
          <div>
            <div className="text-[8px] text-primary font-bold uppercase mb-2">Data_Encryption</div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] text-white font-mono">ENCRYPTED_ENDPOINT_33</span>
            </div>
          </div>
          <div>
            <div className="text-[8px] text-primary font-bold uppercase mb-2">Subject_Classification</div>
            <div className="text-[10px] text-white font-mono uppercase">Master_Engineer // Grade_A</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[9px] tracking-[0.2em] text-white/40 font-bold">
          <button type="button" className="hover:text-primary transition-colors">
            PRIVACY_POLICY
          </button>
          <span className="text-primary/20">|</span>
          <span className="text-hazard">© {new Date().getFullYear()} ANDRII_ZELENETS_STRATEGIC</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
