# repro-react-aria-vitest-focus

Minimal reproduction of a Vitest + Testing Library + React Aria focus conflict.

## Install

```bash
pnpm install
```

## Reproduce

```bash
pnpm test
```

## Actual result

Vitest reports an unhandled exception from `@react-aria/interactions`:

```text
TypeError: Cannot set property focus of [object HTMLElement] which has only a getter
```

The thrown stack points at:

`@react-aria/interactions/dist/useFocusVisible.mjs` in `setupGlobalFocusEvents`.

## Expected result

The test should render a button and click it successfully without unhandled runtime errors.

## Notes

- `StepSingleSelect.test.tsx` calls `userEvent.setup()` first.
- The test then lazy-loads `FocusVisibleLazy.tsx`.
- `FocusVisibleLazy.tsx` imports `useFocusVisible` from `@react-aria/interactions`.
- In this setup, `HTMLElement.prototype.focus` is getter-only by the time React Aria runs its global focus setup, causing the assignment to throw.
