import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHeader from '@/components/layout/PageHeader';

describe('PageHeader', () => {
  it('renders titleMain', () => {
    render(<PageHeader titleMain="ARSENAL" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ARSENAL');
  });

  it('does not render eyebrow when omitted', () => {
    const { container } = render(<PageHeader titleMain="TEST" />);
    // eyebrow is a <p> with specific tracking class
    expect(container.querySelector('p.tracking-\\[0\\.4em\\]')).toBeNull();
  });

  it('renders eyebrow when provided', () => {
    render(<PageHeader titleMain="TEST" eyebrow="Tactical Overview" />);
    expect(screen.getByText('Tactical Overview')).toBeInTheDocument();
  });

  it('does not render titleAccent when omitted', () => {
    const { container } = render(<PageHeader titleMain="MISSION" />);
    expect(container.querySelector('span.text-transparent')).toBeNull();
  });

  it('renders titleAccent with gradient span when provided', () => {
    render(<PageHeader titleMain="MISSION" titleAccent="LOG" />);
    const accent = screen.getByText('LOG');
    expect(accent).toHaveClass('text-transparent');
  });

  it('does not render description when omitted', () => {
    render(<PageHeader titleMain="TEST" />);
    expect(screen.queryByText(/description/i)).toBeNull();
  });

  it('renders description when provided', () => {
    render(<PageHeader titleMain="TEST" description="Some description text" />);
    expect(screen.getByText('Some description text')).toBeInTheDocument();
  });
});
