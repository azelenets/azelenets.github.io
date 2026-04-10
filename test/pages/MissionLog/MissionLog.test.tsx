import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MissionLog from '@/pages/MissionLog';
import MissionItem from '@/pages/MissionLog/MissionItem';

describe('MissionItem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        private cb: IntersectionObserverCallback;
        constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
        observe(el: Element) {
          this.cb(
            [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
        }
        disconnect() {}
        unobserve() {}
      },
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('renders core mission data with tools', async () => {
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

    await act(async () => { vi.runAllTimers(); });

    expect(screen.getByText('Operation Test')).toBeInTheDocument();
    expect(screen.getByText(/MISSION_OBJECTIVE/)).toBeInTheDocument();
    expect(screen.getByAltText('Wireframe')).toBeInTheDocument();
    expect(document.body.textContent).toContain('React');
    expect(document.body.textContent).toContain('TypeScript');
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
