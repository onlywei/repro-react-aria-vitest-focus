import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Suspense, lazy } from "react";
import { describe, expect, it } from "vitest";

const user = userEvent.setup();
const LazyFocusVisibleProbe = lazy(() => import("./FocusVisibleLazy"));

describe("Step - SingleSelect", () => {
  it("renders an aria button and allows click", async () => {
    render(
      <Suspense fallback={<div>Loading</div>}>
        <LazyFocusVisibleProbe />
      </Suspense>,
    );

    const button = await screen.findByRole("button", {
      name: "Lose pregnancy weight",
    });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(button).toBeInTheDocument();
  });
});
