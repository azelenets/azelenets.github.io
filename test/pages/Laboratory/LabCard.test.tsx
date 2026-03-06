import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LabCard from '@/pages/Laboratory/LabCard';

const baseProps = {
  id: 'PRJ_0001',
  codename: 'TEST',
  title: 'MY-PROJECT',
  desc: 'A test project description.',
  status: 'LIVE',
  statusColor: 'bg-primary text-black',
  color: 'primary' as const,
  stats: 'STACK: REACT',
  action: 'VIEW_SOURCE',
  icon: 'terminal',
  children: <div>child content</div>,
};

describe('LabCard', () => {
  it('renders title, id, codename, and description', () => {
    render(<LabCard {...baseProps} />);
    expect(screen.getByText('MY-PROJECT')).toBeInTheDocument();
    expect(screen.getByText(/PRJ_0001/)).toBeInTheDocument();
    expect(screen.getByText('A test project description.')).toBeInTheDocument();
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<LabCard {...baseProps} />);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders a <span> for the action when no link is provided', () => {
    const { container } = render(<LabCard {...baseProps} />);
    const actionEl = container.querySelector('span.uppercase');
    expect(actionEl).toBeInTheDocument();
    expect(container.querySelector('a')).toBeNull();
  });

  it('renders an <a> with correct href when link is provided', () => {
    render(<LabCard {...baseProps} link="https://github.com/example" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/example');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('action text appears inside the link when link is provided', () => {
    render(<LabCard {...baseProps} link="https://github.com/example" />);
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('VIEW_SOURCE');
  });

  it('renders stats text', () => {
    render(<LabCard {...baseProps} />);
    expect(screen.getByText('STACK: REACT')).toBeInTheDocument();
  });

  it.each(['primary', 'hazard', 'alert'] as const)(
    'does not throw for color=%s',
    (color) => {
      expect(() => render(<LabCard {...baseProps} color={color} />)).not.toThrow();
    },
  );
});
