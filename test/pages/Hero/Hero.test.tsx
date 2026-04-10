import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type * as ReactRouterDom from 'react-router-dom';
import Hero from '@/pages/Hero';
import StatBlock from '@/pages/Hero/StatBlock';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Hero page', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    Object.defineProperty(window.navigator, 'vibrate', {
      value: vi.fn(),
      configurable: true,
    });
  });

  it('navigates to arsenal when view stack is clicked', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /View_Stack/i }));
    expect(navigateMock).toHaveBeenCalledWith('/arsenal');
  });
});

describe('Hero StatBlock', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(performance.now() + 2000);
      return 0;
    });
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        private cb: IntersectionObserverCallback;
        constructor(cb: IntersectionObserverCallback) {
          this.cb = cb;
        }
        observe(el: Element) {
          this.cb(
            [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
        }
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders label, value, and bar width', () => {
    const { container } = render(<StatBlock label="Nodes_Managed" value="90+" barColor="bg-primary" width="66%" />);
    expect(screen.getByText('Nodes_Managed')).toBeInTheDocument();
    expect(screen.getByText('90+')).toBeInTheDocument();
    expect(container.querySelector('[style="width: 66%;"]')).toBeInTheDocument();
  });
});
