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

const targets = process.argv.includes("--all")
    ? TARGETS
    : [`bun-${process.platform}-${process.arch}` as Build.CompileTarget];

console.log(chalk.cyan(`Building ${targets.length} target(s)...\n`));

for (const target of targets)
{
    const suffix = target.replace("bun-", "");
    const ext = target.includes("windows") ? ".exe" : "";
    const outfile = `${outDir}/${name}-${suffix}${ext}`;

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

console.log(chalk.cyan("\nDone."));
