import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterButton from '@/pages/Arsenal/FilterButton';
import SpecCard from '@/pages/Arsenal/SpecCard';
import StackColumn from '@/pages/Arsenal/StackColumn';
import TechItem from '@/pages/Arsenal/TechItem';

describe('Arsenal leaf components', () => {
  it('renders FilterButton and handles clicks', () => {
    const onClick = vi.fn();
    render(<FilterButton active label="Backend" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders SpecCard content', () => {
    render(<SpecCard title="Map Overlay" subtitle="TACTICAL VISUAL" img="/images/desktop.avif" />);

    expect(screen.getByText('Map Overlay')).toBeInTheDocument();
    expect(screen.getByText('TACTICAL VISUAL')).toBeInTheDocument();
  });

  it('renders TechItem states', () => {
    const { rerender } = render(<TechItem name="React" version="19" status="ACTIVE" />);
    expect(screen.getAllByText('ACTIVE')).toHaveLength(2);

    rerender(<TechItem name="NestJS" version="11" status="READY" isCritical />);
    expect(screen.getByText('CRITICAL_ASSET')).toBeInTheDocument();

    rerender(<TechItem name="Rails" version="8" status="READY" isMaster />);
    expect(screen.getByText('MASTER_UNIT')).toBeInTheDocument();
  });

  it('expands StackColumn when more items exist', () => {
    render(
      <StackColumn
        type="Backend"
        title="Core Stack"
        id="STACK_01"
        desc="Main services"
        items={[
          { name: 'Node.js', version: '22', status: 'ACTIVE' },
          { name: 'NestJS', version: '11', status: 'ACTIVE' },
          { name: 'PostgreSQL', version: '16', status: 'ACTIVE' },
          { name: 'Redis', version: '7', status: 'ACTIVE' },
        ]}
      />,
    );

    expect(screen.queryByText('Redis')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /\[\s*\+1 more\s*\]/i }));
    expect(screen.getByText('Redis')).toBeInTheDocument();
  });
});
