import { describe, expect, test } from "bun:test";

import { name, version } from "../../src/shared/constants";

import packageJSON from "../../package.json";

describe("constants", () =>
{
    test("name matches package.json", () =>
    {
        expect(name).toBe(packageJSON.name);
    });

    test("version matches package.json", () =>
    {
        expect(version).toBe(packageJSON.version);
    });
});
