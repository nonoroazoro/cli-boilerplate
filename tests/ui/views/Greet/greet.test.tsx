import { describe, expect, test } from "bun:test";
import { render } from "ink-testing-library";

import { Greet } from "../../../../src/ui/views/Greet";

describe("greet", () =>
{
    test("renders greeting with default name", () =>
    {
        const { lastFrame } = render(<Greet flags={{}} positionals={[]} />);
        expect(lastFrame()).toContain("Hello, World!");
    });

    test("renders greeting with custom name", () =>
    {
        const { lastFrame } = render(
            <Greet flags={{ name: "Bun" }} positionals={[]} />
        );
        expect(lastFrame()).toContain("Hello, Bun!");
    });

    test("renders loud greeting", () =>
    {
        const { lastFrame } = render(
            <Greet flags={{ name: "Bun", loud: true }} positionals={[]} />
        );
        expect(lastFrame()).toContain("HELLO, BUN!");
    });
});
