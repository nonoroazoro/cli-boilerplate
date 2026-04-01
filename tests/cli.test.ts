import { describe, expect, test } from "bun:test";

import packageJSON from "../package.json";

async function _run(args: string[]): Promise<{ exitCode: number; stderr: string; stdout: string; }>
{
    const proc = Bun.spawn(["bun", "run", "src/cli.ts", ...args], {
        cwd: `${import.meta.dir}/..`,
        stdout: "pipe",
        stderr: "pipe"
    });
    const [stdout, stderr] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text()
    ]);
    const exitCode = await proc.exited;
    return { stdout: stdout.trim(), stderr: stderr.trim(), exitCode };
}

describe("cli", () =>
{
    test("--version prints version and exits", async () =>
    {
        const { stdout, exitCode } = await _run(["--version"]);
        expect(stdout).toBe(packageJSON.version);
        expect(exitCode).toBe(0);
    });

    test("--help prints usage and command list", async () =>
    {
        const { stdout, exitCode } = await _run(["--help"]);
        expect(stdout).toContain("USAGE");
        expect(stdout).toContain("greet");
        expect(exitCode).toBe(0);
    });

    test("no args prints usage", async () =>
    {
        const { stdout } = await _run([]);
        expect(stdout).toContain("USAGE");
    });

    test("greet command renders greeting", async () =>
    {
        const { stdout, exitCode } = await _run(["greet", "--name", "Bun"]);
        expect(stdout).toContain("Hello, Bun!");
        expect(exitCode).toBe(0);
    });

    test("greet --loud renders uppercase", async () =>
    {
        const { stdout, exitCode } = await _run(["greet", "--name", "Bun", "--loud"]);
        expect(stdout).toContain("HELLO, BUN!");
        expect(exitCode).toBe(0);
    });
});
