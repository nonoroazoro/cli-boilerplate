#!/usr/bin/env bun

/**
 * CLI entry point.
 */
import { getCommand, getCommands, parseGlobalArgs } from "./core";
import { name, version } from "./shared";

async function _main(): Promise<void>
{
    const rawArgv = process.argv.slice(2);
    const { flags, command } = parseGlobalArgs(rawArgv);

    // Fast path: --version
    if (flags.version)
    {
        console.log(version);
        process.exit(0);
    }

    // Fast path: --help or no command
    if (flags.help || !command)
    {
        console.log(`${name} v${version}\n`);
        console.log(`Usage: ${name} <command> [options]\n`);
        console.log("Commands:");
        for (const cmd of getCommands())
        {
            console.log(`  ${cmd.name.padEnd(12)} ${cmd.description}`);
        }
        console.log(`\nRun "${name} <command> --help" for command-specific help.`);
        process.exit(0);
    }

    // Resolve command
    const entry = getCommand(command);
    if (!entry)
    {
        console.error(`Unknown command: ${command}`);
        console.error(`Run "${name} --help" for available commands.`);
        process.exit(1);
    }

    // Pass raw argv after command name to the second-pass parser
    const commandIndex = rawArgv.indexOf(command);
    const commandArgv = rawArgv.slice(commandIndex + 1);

    // Render UI.
    const { run } = await import("./ui/App");
    await run(entry, commandArgv);
}

_main().catch(err =>
{
    throw err;
});
