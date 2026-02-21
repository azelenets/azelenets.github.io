export interface CertData {
  id: string;
  hash: string;
  title: string;
  full?: boolean;
}

export const certifications: CertData[] = [
  { id: '01', hash: 'AWS_CSA_PRO', title: 'AWS Solutions Architect Prof.' },
  { id: '02', hash: 'C_K_AD', title: 'Certified Kubernetes Application Dev' },
  { id: '03', hash: 'OFF_SEC', title: 'OSCP - Offensive Security Certified', full: true },
];

export const combatLanguages: string[] = ['RUST', 'C++', 'GO', 'ASSEMBLY'];

export const tacticalFrameworks: string[] = ['K8S', 'TERRAFORM', 'PULUMI', 'EKS'];
