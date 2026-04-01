import { describe, expect, test } from "bun:test";

import { parseCommandArgs, parseGlobalArgs } from "../../src/core/parser";

describe("parseGlobalArgs", () =>
{
    test("parses command name", () =>
    {
        const result = parseGlobalArgs(["greet"]);
        expect(result.command).toBe("greet");
    });

    test("parses --help flag", () =>
    {
        const result = parseGlobalArgs(["--help"]);
        expect(result.flags.help).toBe(true);
    });

    test("parses -h short flag", () =>
    {
        const result = parseGlobalArgs(["-h"]);
        expect(result.flags.help).toBe(true);
    });

    test("parses --version flag", () =>
    {
        const result = parseGlobalArgs(["--version"]);
        expect(result.flags.version).toBe(true);
    });

    test("parses -v short flag", () =>
    {
        const result = parseGlobalArgs(["-v"]);
        expect(result.flags.version).toBe(true);
    });

    test("collects rest args after command", () =>
    {
        const result = parseGlobalArgs(["greet", "arg1", "arg2"]);
        expect(result.command).toBe("greet");
        expect(result.rest).toEqual(["arg1", "arg2"]);
    });

    test("returns undefined command when no args", () =>
    {
        const result = parseGlobalArgs([]);
        expect(result.command).toBeUndefined();
        expect(result.rest).toEqual([]);
    });
});

describe("parseCommandArgs", () =>
{
    test("parses custom string option", () =>
    {
        const result = parseCommandArgs(
            ["--name", "World"],
            { name: { type: "string", short: "n" } }
        );
        expect(result.flags.name).toBe("World");
    });

    test("parses custom boolean option", () =>
    {
        const result = parseCommandArgs(
            ["--loud"],
            { loud: { type: "boolean", short: "l" } }
        );
        expect(result.flags.loud).toBe(true);
    });

    test("parses short flags", () =>
    {
        const result = parseCommandArgs(
            ["-n", "Bun", "-l"],
            {
                name: { type: "string", short: "n" },
                loud: { type: "boolean", short: "l" }
            }
        );
        expect(result.flags.name).toBe("Bun");
        expect(result.flags.loud).toBe(true);
    });

    test("always includes --help", () =>
    {
        const result = parseCommandArgs(["--help"]);
        expect(result.flags.help).toBe(true);
    });

    test("collects positionals", () =>
    {
        const result = parseCommandArgs(["foo", "bar"]);
        expect(result.positionals).toEqual(["foo", "bar"]);
    });

    test("works without custom options", () =>
    {
        const result = parseCommandArgs(["arg1"]);
        expect(result.positionals).toEqual(["arg1"]);
    });
});
