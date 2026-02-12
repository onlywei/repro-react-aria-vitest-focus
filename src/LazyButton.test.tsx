import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Suspense, lazy } from 'react';
import { describe, expect, it } from 'vitest';

const user = userEvent.setup();

const LazyAriaButton = lazy(async () => {
  const { Button } = await import('react-aria-components');

  function LazyButton() {
    return <Button>Lose pregnancy weight</Button>;
  }

  return { default: LazyButton };
});

describe('react-aria-components Button repro', () => {
  it('throws during lazy-loaded Button render after userEvent setup', async () => {
    render(
      <Suspense fallback={<div>Loading</div>}>
        <LazyAriaButton />
      </Suspense>
    );

    const button = await screen.findByRole('button', { name: 'Lose pregnancy weight' });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(button).toBeInTheDocument();
  });
});
