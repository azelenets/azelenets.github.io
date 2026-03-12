import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CertCard from '@/pages/Credentials/CertCard';
import Credentials from '@/pages/Credentials';
import EducationEntry from '@/pages/Credentials/EducationEntry';
import SkillGroup from '@/pages/Credentials/SkillGroup';

describe('Credentials leaf components', () => {
  it('renders CertCard content', () => {
    render(<CertCard id="01" hash="AWS_CSA" title="AWS Solutions Architect" />);
    expect(screen.getByText(/KEY_HASH: AWS_CSA/)).toBeInTheDocument();
    expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument();
  });

  it('renders EducationEntry details', () => {
    render(
      <EducationEntry
        level="MASTER"
        title="M.Eng."
        institution="Dnipro Polytech"
        years="2011 - 2012"
        withHonor
        fields={[{ label: 'Specialization', value: 'Automation' }]}
      />,
    );

    expect(screen.getByText(/Authorization_Level: MASTER/)).toBeInTheDocument();
    expect(screen.getByText('Diploma with Honor')).toBeInTheDocument();
    expect(screen.getByText('Automation')).toBeInTheDocument();
  });

  it('renders SkillGroup items', () => {
    render(<SkillGroup title="Combat_Languages" items={['RUBY', 'TYPESCRIPT']} />);
    expect(screen.getByText('Combat_Languages')).toBeInTheDocument();
    expect(screen.getByText('RUBY')).toBeInTheDocument();
    expect(screen.getByText('TYPESCRIPT')).toBeInTheDocument();
  });
});

describe('Credentials page', () => {
  it('renders major sections and external profile links', () => {
    render(
      <MemoryRouter>
        <Credentials />
      </MemoryRouter>,
    );

    expect(screen.getByText('Credentials')).toBeInTheDocument();
    expect(screen.getByText('Clearance Dossier')).toBeInTheDocument();
    expect(screen.getByText('Education Authorization')).toBeInTheDocument();
    expect(screen.getByText('Training_Modules_Log')).toBeInTheDocument();
    expect(screen.getByText('Combat_Languages')).toBeInTheDocument();
    expect(screen.getByText('Tactical_Frameworks')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn_Profile/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/andriizelenets/');
    expect(screen.getByRole('link', { name: /GitHub_Profile/i })).toHaveAttribute('href', 'https://github.com/azelenets');
  });
});
