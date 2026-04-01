import { describe, expect, test } from "bun:test";

import packageJSON from "../package.json";

async function _run(args: string[]): Promise<{ stdout: string; stderr: string; exitCode: number; }>
{
    const proc = Bun.spawn(["bun", "run", "src/cli.ts", ...args], {
        cwd: import.meta.dir + "/..",
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

    test("-v prints version", async () =>
    {
        const { stdout, exitCode } = await _run(["-v"]);
        expect(stdout).toBe(packageJSON.version);
        expect(exitCode).toBe(0);
    });

    test("--help prints usage and command list", async () =>
    {
        const { stdout, exitCode } = await _run(["--help"]);
        expect(stdout).toContain(`${packageJSON.name} v${packageJSON.version}`);
        expect(stdout).toContain("Usage:");
        expect(stdout).toContain("greet");
        expect(exitCode).toBe(0);
    });

    test("no args prints help", async () =>
    {
        const { stdout, exitCode } = await _run([]);
        expect(stdout).toContain("Usage:");
        expect(exitCode).toBe(0);
    });

    test("unknown command prints error", async () =>
    {
        const { stderr, exitCode } = await _run(["nonexistent"]);
        expect(stderr).toContain("Unknown command: nonexistent");
        expect(exitCode).toBe(1);
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
