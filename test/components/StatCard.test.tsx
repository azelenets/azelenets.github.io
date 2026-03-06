import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '@/components/StatCard';

const baseProps = {
  id: 'STAT-01',
  label: 'Missions completed',
  value: '42',
  progress: 75,
};

describe('StatCard', () => {
  it('renders id, label, and value', () => {
    render(<StatCard {...baseProps} />);
    expect(screen.getByText('STAT-01')).toBeInTheDocument();
    expect(screen.getByText('Missions completed')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders a single progress bar by default', () => {
    const { container } = render(<StatCard {...baseProps} />);
    const bars = container.querySelectorAll('[style*="width"]');
    expect(bars).toHaveLength(1);
    expect((bars[0] as HTMLElement).style.width).toBe('75%');
  });

  it('renders three segmented bars when segmented=true', () => {
    const { container } = render(<StatCard {...baseProps} segmented />);
    // No inline style width present; the bar track contains 3 children
    const track = container.querySelector('.h-1.w-full');
    expect(track?.children).toHaveLength(3);
    // No progress bar with inline width style
    const inlineBars = container.querySelectorAll('[style*="width"]');
    expect(inlineBars).toHaveLength(0);
  });

  it('progress bar width reflects the progress prop', () => {
    const { container } = render(<StatCard {...baseProps} progress={30} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe('30%');
  });
});
