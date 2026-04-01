import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { Text } from "ink";

import { run } from "../../src/ui/app";

import type { CommandEntry } from "../../src/shared";
import type { CommandProps } from "../../src/shared/types/commands/CommandProps";

function TestView(props: CommandProps)
{
    return <Text>name={String(props.flags.name ?? "")}</Text>;
}

function _makeEntry(overrides?: Partial<CommandEntry["def"]>): CommandEntry
{
    return {
        def: {
            name: "test",
            description: "A test command",
            ...overrides
        },
        load: async () => ({ default: TestView })
    };
}

describe("run", () =>
{
    const exitSpy = spyOn(process, "exit").mockImplementation(() =>
    {
        throw new Error("process.exit");
    });

    afterEach(() =>
    {
        exitSpy.mockClear();
    });

    test("renders command view with parsed flags", async () =>
    {
        const logs: string[] = [];
        const logSpy = spyOn(console, "log").mockImplementation((...args: unknown[]) =>
        {
            logs.push(args.join(" "));
        });

        const entry = _makeEntry({
            options: { name: { type: "string", short: "n" } }
        });

        await run(entry, ["--name", "World"]);
        logSpy.mockRestore();
    });

    test("prints help and exits with --help flag", async () =>
    {
        const logs: string[] = [];
        const logSpy = spyOn(console, "log").mockImplementation((...args: unknown[]) =>
        {
            logs.push(args.join(" "));
        });

        const entry = _makeEntry({
            options: { name: { type: "string", short: "n" } }
        });

        await expect(run(entry, ["--help"])).rejects.toThrow("process.exit");
        expect(exitSpy).toHaveBeenCalledWith(0);
        expect(logs.some(l => l.includes("Usage:"))).toBe(true);
        expect(logs.some(l => l.includes("--name"))).toBe(true);
        logSpy.mockRestore();
    });
});
