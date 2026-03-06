import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Arsenal from '@/pages/Arsenal/index';

function renderArsenal() {
  return render(
    <MemoryRouter>
      <Arsenal />
    </MemoryRouter>,
  );
}

describe('Arsenal page', () => {
  it('renders the page header', () => {
    renderArsenal();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders all stack columns when query is empty', () => {
    renderArsenal();
    // NO_ASSETS_FOUND should not appear with no filter
    expect(screen.queryByText('NO_ASSETS_FOUND')).toBeNull();
  });

  it('filters columns by column title', async () => {
    renderArsenal();
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Languages');
    expect(screen.getByText('Languages_Src')).toBeInTheDocument();
    // A column that doesn't match the query should be hidden
    expect(screen.queryByText('Backend_Frameworks')).toBeNull();
  });

  it('filters columns by item name', async () => {
    renderArsenal();
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Ruby');
    // Languages_Src contains Ruby — column should be visible
    expect(screen.getByText('Languages_Src')).toBeInTheDocument();
  });

  it('filtering is case-insensitive', async () => {
    renderArsenal();
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'ruby');
    expect(screen.getByText('Languages_Src')).toBeInTheDocument();
  });

  it('shows NO_ASSETS_FOUND when nothing matches', async () => {
    renderArsenal();
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'xXxNonExistentTechxXx');
    expect(screen.getByText('NO_ASSETS_FOUND')).toBeInTheDocument();
  });

  it('shows current query in the empty-state message', async () => {
    renderArsenal();
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'notfound');
    expect(screen.getByText(/notfound/i)).toBeInTheDocument();
  });
});
