/**
 * CLI entry point.
 */

import { defineCommand, runMain, showUsage } from "citty";
import colors from "tinyrainbow";

import { name, version } from "./shared";

const { bold, dim, red } = colors;

const main = defineCommand({
    meta: { name, version, description: `${name} CLI` },
    subCommands: {
        greet: async () => import("./core/commands/greet").then(m => m.greet)
    },
    run({ rawArgs })
    {
        if (rawArgs.length === 0)
        {
            showUsage(main).catch(_handleError);
        }
    }
});

runMain(main).catch(_handleError);

function _handleError(err: Error)
{
    console.error(`\n${red(bold("Error:"))} ${err.message}`);
    if (err.stack)
    {
        console.error(dim(err.stack));
    }
    process.exit(1);
}
