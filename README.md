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

- `src/ButtonRepro.test.tsx` is the only repro test.
- The test calls `userEvent.setup()` first.
- It then lazy-loads `Button` from `react-aria-components`.
- This triggers React Aria global focus setup, which tries to assign `HTMLElement.prototype.focus` and throws because it is getter-only in this timing.
