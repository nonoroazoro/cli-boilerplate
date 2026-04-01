import { render } from "ink";

import { ErrorBoundary } from "./components";
import { parseCommandArgs } from "../core";
import { name as cliName } from "../shared/constants";

import type { CommandEntry } from "../shared";

/**
 * Bridges between pure CLI and UI.
 *
 * This is the only file imported by {@link cli.ts} via dynamic import.
 */
export async function run(entry: CommandEntry, argv: string[]): Promise<void>
{
    const { flags, positionals } = parseCommandArgs(argv, entry.def.options);

    if (flags.help)
    {
        _printCommandHelp(entry);
        process.exit(0);
    }

    const { default: View } = await entry.load();
    const instance = render(
        <ErrorBoundary>
            <View flags={flags} positionals={positionals} />
        </ErrorBoundary>
    );

    if (entry.def.interactive)
    {
        await instance.waitUntilExit();
    }
    else
    {
        instance.unmount();
    }
}

function _printCommandHelp(entry: CommandEntry): void
{
    console.log(`Usage: ${cliName} ${entry.def.name} [options]\n`);
    console.log(`${entry.def.description}\n`);
    const opts = entry.def.options;
    if (opts)
    {
        console.log("Options:");
        for (const [name, opt] of Object.entries(opts))
        {
            const short = opt.short ? `-${opt.short}, ` : "    ";
            console.log(`  ${short}--${name.padEnd(12)} [${opt.type}]`);
        }
    }
}
