import { describe, expect, test } from "bun:test";

import { getCommand, getCommands, registerCommand } from "../../src/core/registry";

describe("registry", () =>
{
    test("pre-registered greet command exists", () =>
    {
        const entry = getCommand("greet");
        expect(entry).toBeDefined();
        expect(entry?.def.name).toBe("greet");
        expect(entry?.def.description).toBe("Greet someone with style");
    });

    test("greet command has correct options", () =>
    {
        const entry = getCommand("greet");
        expect(entry?.def.options).toEqual({
            name: { type: "string", short: "n" },
            loud: { type: "boolean", short: "l" }
        });
    });

    test("getCommand returns undefined for unknown command", () =>
    {
        expect(getCommand("nonexistent")).toBeUndefined();
    });

    test("getCommands returns all registered defs", () =>
    {
        const commands = getCommands();
        expect(commands.length).toBeGreaterThanOrEqual(1);
        expect(commands.some(c => c.name === "greet")).toBe(true);
    });

    test("registerCommand adds a new command", () =>
    {
        registerCommand(
            { name: "__test__", description: "test command" },
            async () => ({ default: () => null })
        );
        const entry = getCommand("__test__");
        expect(entry).toBeDefined();
        expect(entry?.def.name).toBe("__test__");
    });
});
