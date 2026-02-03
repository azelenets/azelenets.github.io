import React from 'react';
import { View } from '../App';

interface ProtocolsProps {
    setView: (view: View) => void;
}

const Protocols: React.FC<ProtocolsProps> = ({ setView }) => {
  return (
    <div className="flex flex-col items-center py-12 px-6 md:px-20 lg:px-40 relative z-10 w-full">
        <div className="max-w-[1200px] w-full flex flex-col gap-24">
            
            {/* Top Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-1 font-mono">
                <StatCard id="STAT_01" label="Combat Experience" value="13+ YEARS" progress={75} color="primary" />
                <StatCard id="STAT_02" label="Authorization Level" value="MASTER'S [CS]" progress={100} color="primary" segmented />
                <div className="bg-surface-terminal border border-primary/10 p-6 relative">
                    <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">STAT_03</div>
                    <p className="text-primary/60 text-[10px] uppercase mb-1">Strategic Reach</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">50M+ OPS</p>
                    <p className="text-[10px] text-alert mt-4 uppercase animate-pulse">CRITICAL INFRASTRUCTURE REACHED</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="flex flex-col gap-12 relative">
                <div className="flex flex-col gap-2 border-l-4 border-alert pl-6 py-2">
                    <div className="flex items-center gap-3">
                        <span className="text-alert font-mono text-sm font-bold tracking-[0.2em] uppercase">Operational Doctrine</span>
                        <div className="h-[1px] flex-1 bg-alert/20"></div>
                    </div>
                    <h2 className="text-white text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase font-mono shadow-red-500 drop-shadow-sm">
                        Strategic Protocols
                    </h2>
                    <p className="text-primary/60 font-mono text-sm max-w-xl uppercase tracking-tighter">
                        Executing mission-critical directives to ensure absolute engineering dominance and structural integrity across all deployment theaters.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/20 border border-primary/20">
                    <ProtocolCard 
                        id="DIR_EXCELLENCE_01"
                        icon="precision_manufacturing"
                        title="Engineering Excellence"
                        status="MODULE_LOADED_OK"
                        dots={3}
                    >
                        Engineering is not just implementation; it is tactical warfare against technical debt. Every line of code is a structural asset designed for maximum stability under fire.
                    </ProtocolCard>

                    <ProtocolCard 
                        id="DIR_COMMAND_02"
                        icon="radar"
                        title="Strategic Leadership"
                        status="UPLINK_STABLE"
                        dots={2}
                    >
                        Leadership is tactical positioning. Ensuring that engineering velocity is directed toward high-impact business objectives with zero deviation.
                    </ProtocolCard>

                    <ProtocolCard 
                        id="DIR_INTEGRATION_03"
                        icon="hub"
                        title="Mission Collaboration"
                        status="NODES_SYNCED"
                        dots={1}
                    >
                         Fostering technical mentorship and team cohesion. High-performance units are built on trust, clear communication, and shared tactical awareness.
                    </ProtocolCard>

                    <ProtocolCard 
                        id="DIR_DEPLOY_04"
                        icon="deployed_code"
                        title="User-Centric Targeting"
                        status="TARGET_LOCKED"
                        dots={3}
                    >
                        Engineering is the bridge between abstraction and utility. If the end-user objective is not met, the mission is a failure.
                    </ProtocolCard>
                </div>
            </section>

            {/* CTA */}
            <section className="relative font-mono overflow-hidden py-10">
                 <div className="hud-border bg-surface-terminal/80 p-12 md:p-20 flex flex-col items-center gap-8 relative z-10 slanted-clip mx-auto max-w-4xl">
                    <div className="text-[10px] text-alert font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">// SYSTEM_READY //</div>
                    <h2 className="text-white text-3xl md:text-5xl font-black text-center uppercase tracking-tighter max-w-3xl">
                        Initiate Next <span className="text-primary">Operational Phase?</span>
                    </h2>
                    <p className="text-primary/60 text-sm md:text-base text-center max-w-xl uppercase tracking-tighter">
                        Requesting connection to deploy advanced architectural frameworks for your high-value technical assets.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        <button onClick={() => setView(View.CREDENTIALS)} className="bg-primary text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">
                            ESTABLISH_UPLINK
                        </button>
                        <button onClick={() => setView(View.ARSENAL)} className="border border-primary/40 text-primary px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary/10 transition-all">
                            DECRYPT_STACK
                        </button>
                    </div>
                 </div>
            </section>
        </div>
    </div>
  );
};

const StatCard = ({ id, label, value, progress, segmented }: { id: string, label: string, value: string, progress: number, color: string, segmented?: boolean }) => (
    <div className="bg-surface-terminal border border-primary/10 p-6 relative group overflow-hidden hover:border-primary/40 transition-colors">
        <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">{id}</div>
        <p className="text-primary/60 text-[10px] uppercase mb-1">{label}</p>
        <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
        <div className="h-1 w-full bg-primary/10 mt-4 overflow-hidden flex gap-1">
            {segmented ? (
                <>
                    <div className="h-full bg-primary flex-1"></div>
                    <div className="h-full bg-primary flex-1"></div>
                    <div className="h-full bg-primary/20 flex-1"></div>
                </>
            ) : (
                <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
            )}
        </div>
    </div>
);

const ProtocolCard = ({ id, icon, title, status, dots, children }: any) => (
    <div className="bg-surface-terminal/90 p-10 flex flex-col gap-8 group hover:bg-primary/5 transition-all relative overflow-hidden">
        <div className="flex justify-between items-start">
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center text-primary relative">
                <span className="material-symbols-outlined text-4xl">{icon}</span>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary"></div>
            </div>
            <span className="font-mono text-primary/40 text-xs">// {id}</span>
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="text-white text-2xl font-bold font-mono tracking-tight uppercase group-hover:text-primary transition-colors">
                {title}
            </h3>
            <div className="h-px w-12 bg-alert"></div>
            <p className="text-slate-400 text-sm leading-relaxed font-mono">
                <span className="text-primary">[OBJECTIVE]</span> {children}
            </p>
        </div>
        <div className="mt-auto pt-6 border-t border-primary/10 flex justify-between items-center opacity-40">
            <div className="flex gap-1">
                {[...Array(dots)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary"></div>
                ))}
            </div>
            <span className="text-[8px] font-mono text-primary">{status}</span>
        </div>
    </div>
);

export default Protocols;