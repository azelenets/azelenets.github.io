import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CliFilter from '@/pages/Arsenal/CliFilter';

describe('CliFilter', () => {
  it('renders the input with the provided value', () => {
    render(<CliFilter value="react" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('react');
  });

  it('renders placeholder text', () => {
    render(<CliFilter value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('SEARCH...')).toBeInTheDocument();
  });

  it('calls onChange on every keystroke', async () => {
    const onChange = vi.fn();
    render(<CliFilter value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'ab');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 'a');
    expect(onChange).toHaveBeenNthCalledWith(2, 'b');
  });

  it('does not call onChange when value changes externally without interaction', () => {
    const onChange = vi.fn();
    const { rerender } = render(<CliFilter value="" onChange={onChange} />);
    rerender(<CliFilter value="updated" onChange={onChange} />);
    expect(onChange).not.toHaveBeenCalled();
  });
});
