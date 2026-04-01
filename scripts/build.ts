import chalk from "chalk";

import type { Build } from "bun";

import packageJSON from "../package.json";
import tsconfigJSON from "../tsconfig.json";

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

console.log(chalk.cyan(`Building ${targets.length} target(s)...\n`));

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

        console.log(`  ${chalk.green("✓")} ${chalk.bold(suffix)} ${chalk.dim("->")} ${chalk.dim(outfile)}`);
    }
    catch
    {
        failed.push(suffix);
        console.log(`  ${chalk.red("✗")} ${chalk.bold(suffix)} ${chalk.dim("— cross-compile failed, skipped")}`);
    }
}

if (failed.length === targets.length)
{
    console.log(chalk.red("\nAll targets failed."));
    process.exit(1);
}

if (failed.length > 0)
{
    console.log(chalk.yellow(`\nDone with ${failed.length} target(s) skipped.`));
}
else
{
    console.log(chalk.cyan("\nDone."));
}
