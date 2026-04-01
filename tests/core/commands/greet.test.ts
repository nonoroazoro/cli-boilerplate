import { describe, expect, test } from "bun:test";

import type { CommandMeta } from "citty";

import { greet } from "../../../src/core/commands/greet";

describe("greet command", () =>
{
    test("has correct meta", () =>
    {
        const meta = greet.meta as CommandMeta;
        expect(meta.name).toBe("greet");
        expect(meta.description).toBe("Greet someone with style");
    });

    test("has correct args", async () =>
    {
        const args = await greet.args;
        expect(args).toEqual({
            name: { type: "string", description: "Name to greet" },
            loud: { type: "boolean", description: "Use loud greeting" }
        });
    });
});
