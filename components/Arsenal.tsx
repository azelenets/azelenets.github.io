import React from 'react';

const Arsenal: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative">
        {/* Header */}
        <div className="mb-16 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-8">
                <div className="max-w-2xl">
                    <p className="text-primary text-xs font-bold mb-2 tracking-[0.4em] uppercase">Tactical Capability Overview</p>
                    <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-tight">
                        Tech Stack <span className="text-primary">Arsenal</span> Matrix
                    </h1>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase">
                        Structural schematic of offensive and defensive engineering assets. High-density deployment capabilities across distributed infrastructure and enterprise-grade environments.
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1 font-mono shrink-0">
                    <span className="text-[10px] text-primary/60 uppercase">System_Load: Nominal</span>
                    <div className="flex gap-1.5 mb-1">
                        <div className="w-10 h-1 bg-primary"></div>
                        <div className="w-10 h-1 bg-primary"></div>
                        <div className="w-10 h-1 bg-primary"></div>
                        <div className="w-10 h-1 bg-primary/20"></div>
                    </div>
                    <span className="text-4xl font-bold text-primary leading-none">08 <span className="text-xs text-slate-600">UNITS</span></span>
                </div>
            </div>
        </div>

        {/* CLI Filter */}
        <div className="mb-12">
            <div className="bg-surface-terminal border border-primary/20 p-4 font-mono shadow-2xl relative">
                <div className="flex items-center gap-3">
                    <span className="text-primary shrink-0">operator@aegis:~$</span>
                    <input className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder:text-primary/30 text-lg p-0 uppercase focus:outline-none" placeholder="QUERY_ARSENAL --FILTER=*" type="text"/>
                    <div className="w-2 h-5 bg-primary animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                <FilterButton active label="ALL_ASSETS" />
                <FilterButton label="LANGUAGES_SRC" />
                <FilterButton label="INFRA_ORCHESTRATION" />
                <FilterButton label="UI_RECON" />
                <FilterButton label="DB_CLUSTERS" />
                <FilterButton label="SEC_PROTOCOLS" />
            </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Core Langs */}
            <StackColumn 
                type="01_CORE" 
                title="Languages_Src" 
                id="LANG-99"
                desc="High-performance low-level system integration focus."
            >
                <TechItem name="Rust" version="v1.75.0" status="DEPLOY_READY" isCritical />
                <TechItem name="Go (Golang)" version="v1.22" status="CONCURRENCY_OP" />
                <TechItem name="TypeScript" version="v5.4" status="TYPED_INTERFACE" />
            </StackColumn>

             {/* Infra */}
            <StackColumn 
                type="02_ORCH" 
                title="Infra_Systems" 
                id="CLOUD-88"
                desc="Orchestrating large-scale autonomous deployments."
            >
                <TechItem name="Kubernetes" version="K8s_v1.29" status="GRID_CONTROL" isMaster />
                <TechItem name="AWS_Solutions" version="GLOBAL_EXP" status="PROD_SCALE" />
                <TechItem name="Terraform" version="v1.7.0" status="I_A_C_PROTOCOL" />
            </StackColumn>

             {/* Backend */}
            <StackColumn 
                type="03_SERV" 
                title="Backend_Forge" 
                id="SERV-77"
                desc="Distributed microservice architecture specialists."
            >
                <TechItem name="PostgreSQL" version="v16.2" status="PERSISTENCE_LAYER" />
                <TechItem name="Redis_Cache" version="v7.0" status="MEMORY_BUFFER" />
                <TechItem name="gRPC / Protobuf" version="PROTO_v3" status="RPC_TRANSPORT" />
            </StackColumn>

        </div>

        {/* Specializations Footer */}
        <div className="mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-primary/20 pb-4 gap-4">
                <h2 className="text-2xl font-black uppercase tracking-widest text-white">System_Specializations</h2>
                <a className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity" href="#">
                    Download_Full_Schematics <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                <SpecCard title="DISTRIBUTED_NODES" subtitle="HIGH_AVAILABILITY_PROTOCOLS" img="https://lh3.googleusercontent.com/aida-public/AB6AXuADWsrwF3hQSZhLi7wNLzFnpifp3LTJKXIrQapqu-2aWRwFuC6RY4WVbAjaml_3puTMZaO2rSoI5cA8pSZw4X8aQxB5HHduXPL0OP50GBIyLbYHEoe2yvTMJ8r8BhwcFM15pznCAF_Vy663jfkf3FcYFxAj3Ya2ymXd6-2i_7yzqIJSXnF6RaIhaALuWDV4LwGqSSApcZISY-J1ddX44kX57uQ-FDfG8V6F3HI3zZFPJibyPCed23KGPMZ9P82ldYPV_oyU83DgPpWq" />
                <SpecCard title="CLOUD_NATIVE" subtitle="K8S_SERVERLESS_INFRA" img="https://lh3.googleusercontent.com/aida-public/AB6AXuBcu6sG4lqDoN5K-XB_f4gepep4NKPA8CibC4qdyJYuSRm29fBuuv7Mkbvr71SjGy5peaFvpBKRVE89E7gubxlcV2ioLzz8Z9xsqqWLptawt6MpIBrwrwzX533d2EIXN3f65XGtwe6RZSHtH71J2T0J0p-HGZe9vtSz8MNWYTqKH2GEmr8oFdlHr2fUEBOeUUu5gG7XClZ18LOE9H6rwv7qsaw54mD6EgZKQmqQqcvO5qhkRqBr5O4BY-BoupwYx7-DPFzbLBizUP1p" />
                <SpecCard title="DATA_FORGE" subtitle="ETL_REALTIME_STREAMING" img="https://lh3.googleusercontent.com/aida-public/AB6AXuB5nKuDAa92MBL8Y5QfmwF3C6IaFY4EvV4GbxmnrEJpPOczD_RtMZyfd77PRdnNy8vDm8O4h6BhEPUSeEyGfeWzcWC1w4PErsrkMlJwx8zD2Meacaj3_sbpjE3xdp-sK8w5Mqpq3nTXG67iPkK5eDe-uKGSWOrN6mg27CbMo80ICnn9jdMBO_39-suuiJ-NzyMy2Dud8OTnibeVtFljegTr2P5jOSl851xWECdtQSe7qstBMn4FxqPo0UZHwMLDjt9Dmy_rlMUAQXXi" />
                <SpecCard title="TACTICAL_UI" subtitle="DESIGN_SYSTEMS_VX" img="https://lh3.googleusercontent.com/aida-public/AB6AXuCfoajEXS99U8OHQb8MvVT6vkyaAoe53Fk8dpsgARIpYc2RnXukmMtMTPJCmmb4ZZC3WhtUVbmSJvwv7FcYEkqVoR6idQFn-S26_-tqBytFVZoH5rJLsWrUwu8UEpJ6eAcPLCmDonkwXKJXLFxeuu-Zi9-xcnUYxx7vKl9T607bz9p8LqjI8m5QEDtlcKO67_DaYcH0MAKn7rS_wT3niuXp3OhNXjacr8oUy5WcDZz5mcmRf1sQhYvnz_oDO2PqHYnC2WwcRjfzyrDC" />
            </div>
        </div>
    </div>
  );
};

interface FilterButtonProps {
    active?: boolean;
    label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, label }) => (
    <button className={`shrink-0 px-4 py-1 text-[10px] font-bold uppercase transition-all ${active ? 'bg-primary text-black' : 'border border-primary/30 text-primary/70 hover:bg-primary/10'}`}>
        {label}
    </button>
);

interface StackColumnProps {
    type: string;
    title: string;
    id: string;
    desc: string;
    children: React.ReactNode;
}

const StackColumn: React.FC<StackColumnProps> = ({ type, title, id, desc, children }) => (
    <div className="hud-border bg-surface-terminal p-6 flex flex-col">
        <div className="flex justify-between items-start mb-6">
            <div>
                <span className="text-[10px] text-primary font-bold mb-1 block uppercase">Module_Type: {type}</span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-600">ID: {id}</span>
        </div>
        <div className="space-y-3 flex-1">
            {children}
        </div>
        <div className="mt-8 pt-4 border-t border-primary/10">
            <p className="text-[10px] text-primary/40 font-mono italic uppercase tracking-wider leading-relaxed">{desc}</p>
        </div>
    </div>
);

interface TechItemProps {
    name: string;
    version: string;
    status: string;
    isCritical?: boolean;
    isMaster?: boolean;
}

const TechItem: React.FC<TechItemProps> = ({ name, version, status, isCritical, isMaster }) => {
    let borderColor = 'border-primary/10 hover:border-primary';
    let nameColor = 'text-primary';
    let badge = null;

    if (isCritical) {
        borderColor = 'border-alert/20 hover:border-alert';
        nameColor = 'text-alert';
        badge = <span className="text-[9px] text-alert font-bold px-1 bg-alert/10 border border-alert shadow-[0_0_10px_rgba(255,62,62,0.3)]">CRITICAL_ASSET</span>;
    } else if (isMaster) {
        borderColor = 'border-alert/20 hover:border-alert';
        nameColor = 'text-alert';
        badge = <span className="text-[9px] text-alert font-bold px-1 bg-alert/10 border border-alert shadow-[0_0_10px_rgba(255,62,62,0.3)]">MASTER_UNIT</span>;
    } else {
        badge = <span className="text-[9px] text-primary/50 font-bold uppercase px-1 border border-primary/30">ACTIVE</span>;
    }

    return (
        <div className={`border p-3 bg-bg-dark group transition-colors relative ${borderColor}`}>
            <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-bold uppercase group-hover:text-white ${nameColor}`}>{name}</span>
                {badge}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{version}</span>
                <span>{status}</span>
            </div>
        </div>
    );
};

interface SpecCardProps {
    title: string;
    subtitle: string;
    img: string;
}

const SpecCard: React.FC<SpecCardProps> = ({ title, subtitle, img }) => (
    <div className="group relative overflow-hidden bg-surface-terminal border border-primary/10 aspect-video grayscale hover:grayscale-0 transition-all cursor-pointer">
        <div className="absolute inset-0 bg-primary/20 z-10 opacity-40 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${img}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-20"></div>
        <div className="absolute bottom-4 left-4 z-30">
            <h4 className="text-white font-bold uppercase text-sm tracking-tighter">{title}</h4>
            <p className="text-[9px] text-primary/70 font-mono">{subtitle}</p>
        </div>
    </div>
);

export default Arsenal;