import { describe, expect, test } from "bun:test";
import { Text } from "ink";
import { render } from "ink-testing-library";

import { ErrorBoundary } from "../../../../src/ui/components/ErrorBoundary/ErrorBoundary";

function ThrowingComponent(): never
{
    throw new Error("test error");
}

describe("ErrorBoundary", () =>
{
    test("renders children when no error", () =>
    {
        const { lastFrame } = render(
            <ErrorBoundary>
                <Text>Hello</Text>
            </ErrorBoundary>
        );
        expect(lastFrame()).toContain("Hello");
    });

    test("catches error and displays message", () =>
    {
        const { lastFrame } = render(
            <ErrorBoundary>
                <ThrowingComponent />
            </ErrorBoundary>
        );
        expect(lastFrame()).toContain("Error: test error");
    });
});
