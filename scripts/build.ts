import type { Build } from "bun";

import packageJSON from "../package.json";
import tsconfigJSON from "../tsconfig.json";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

function _color(color: string, text: string): string
{
    return `${Bun.color(color, "ansi")}${text}${RESET}`;
}

function _bold(text: string): string
{
    return `${BOLD}${text}${RESET}`;
}

function _dim(text: string): string
{
    return `${DIM}${text}${RESET}`;
}

const name = Object.keys(packageJSON.bin)[0] as keyof typeof packageJSON.bin;
const entry = packageJSON.bin[name];
const outDir = tsconfigJSON.compilerOptions.outDir;

const TARGETS: Build.CompileTarget[] = [
    "bun-darwin-arm64",
    "bun-darwin-x64",
    "bun-linux-arm64",
    "bun-linux-x64",
    "bun-windows-x64"
];

const PLATFORM_MAP: Record<string, string> = {
    win32: "windows",
    darwin: "darwin",
    linux: "linux"
};

const targets = process.argv.includes("--all")
    ? TARGETS
    : [`bun-${PLATFORM_MAP[process.platform] ?? process.platform}-${process.arch}` as Build.CompileTarget];

console.log(_color("cyan", `Building ${targets.length} target(s)...\n`));

const failed: string[] = [];

for (const target of targets)
{
    const suffix = target.replace("bun-", "");
    const ext = target.includes("windows") ? ".exe" : "";
    const outfile = `${outDir}/${name}-${suffix}${ext}`;

    try
    {
        await Bun.build({
            entrypoints: [entry],
            compile: {
                target,
                outfile
            },
            minify: true,
            define: {
                NAME: JSON.stringify(name),
                VERSION: JSON.stringify(packageJSON.version)
            }
        });

        console.log(`  ${_color("green", "✓")} ${_bold(suffix)} ${_dim("->")} ${_dim(outfile)}`);
    }
    catch
    {
        failed.push(suffix);
        console.log(`  ${_color("red", "✗")} ${_bold(suffix)} ${_dim("— cross-compile failed, skipped")}`);
    }
}

if (failed.length === targets.length)
{
    console.log(_color("red", "\nAll targets failed."));
    process.exit(1);
}

if (failed.length > 0)
{
    console.log(_color("yellow", `\nDone with ${failed.length} target(s) skipped.`));
}
else
{
    console.log(_color("cyan", "\nDone."));
}
