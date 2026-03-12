import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Laboratory from '@/pages/Laboratory';

describe('Laboratory page', () => {
  it('renders the lab header, project cards, and initiative CTA', () => {
    render(
      <MemoryRouter>
        <Laboratory />
      </MemoryRouter>,
    );

    expect(screen.getByText('R&D')).toBeInTheDocument();
    expect(screen.getByText('EXPERIMENTAL LAB')).toBeInTheDocument();
    expect(screen.getByText('AEGIS DESIGN SYSTEM')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /VIEW_PACKAGE/i })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@azelenets/aegis-design-system',
    );
    expect(screen.getByText('NEW_INITIATIVE')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Initialize_Draft/i })).toBeInTheDocument();
  });
});
