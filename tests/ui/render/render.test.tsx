import { afterEach, describe, spyOn, test } from "bun:test";
import { Text } from "ink";

import { renderView } from "../../../src/ui/render";

import type { CommandProps } from "../../../src/shared";

function TestView(props: CommandProps)
{
    return <Text>name={String(props.flags.name ?? "")}</Text>;
}

describe("renderView", () =>
{
    const exitSpy = spyOn(process, "exit").mockImplementation(() =>
    {
        throw new Error("process.exit");
    });

    afterEach(() =>
    {
        exitSpy.mockClear();
    });

    test("renders view with flags", async () =>
    {
        await renderView(TestView, { flags: { name: "World" }, positionals: [] });
    });

    test("renders view with empty props", async () =>
    {
        await renderView(TestView, { flags: {}, positionals: [] });
    });
});
