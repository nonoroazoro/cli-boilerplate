/**
 * CLI entry point.
 */

import { defineCommand, runMain } from "citty";
import colors from "tinyrainbow";

import { name, version } from "./shared";

const { bold, dim, red } = colors;

const main = defineCommand({
    meta: { name, version, description: `${name} CLI` },
    subCommands: {
        greet: async () => import("./core/commands/greet").then(m => m.greet)
    }
});

runMain(main).catch((err: Error) =>
{
    console.error(`\n${red(bold("Error:"))} ${err.message}`);
    if (err.stack)
    {
        console.error(dim(err.stack));
    }
    process.exit(1);
});
