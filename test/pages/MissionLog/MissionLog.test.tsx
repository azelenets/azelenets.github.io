import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MissionLog from '@/pages/MissionLog';
import MissionItem from '@/pages/MissionLog/MissionItem';

describe('MissionItem', () => {
  it('renders core mission data with tools', () => {
    render(
      <MissionItem
        date="2026.Q1"
        title="Operation Test"
        role="Engineer"
        scanId="SCAN_01"
        objective="Ship a mission-critical feature."
        tactics={['Establish baseline', 'Deploy fix']}
        tools={['React', 'TypeScript']}
        outcome="SUCCESS"
        status="LIVE"
        statusColor="text-primary bg-primary/10"
        align="left"
        imageUrl="/images/desktop.avif"
      />,
    );

    expect(screen.getByText('Operation Test')).toBeInTheDocument();
    expect(screen.getByText(/MISSION_OBJECTIVE/)).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByAltText('Wireframe')).toBeInTheDocument();
  });
});

describe('MissionLog page', () => {
  it('renders the section header and CV link', () => {
    render(
      <MemoryRouter>
        <MissionLog />
      </MemoryRouter>,
    );

    expect(screen.getByText('MISSION LOG')).toBeInTheDocument();
    expect(screen.getByText('HISTORY')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /DOWNLOAD_CV.PDF/i })).toHaveAttribute(
      'href',
      'https://www.papermark.com/view/cmmn7ad370003jl04z65lbvi4',
    );
  });
});
