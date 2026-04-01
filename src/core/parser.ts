import { parseArgs } from "node:util";

import type { ParseArgsConfig } from "node:util";

import type { CommandArgs, GlobalArgs } from "../shared";

/**
 * First-pass: Parses global flags and command names.
 *
 * @param {string[]} args the command-line arguments to parse.
 */
export function parseGlobalArgs(args: string[]): GlobalArgs
{
    const { values, positionals } = parseArgs({
        args,
        strict: false,
        allowPositionals: true,
        options: {
            help: { type: "boolean", short: "h" },
            version: { type: "boolean", short: "v" }
        }
    });
    return {
        command: positionals[0],
        flags: values,
        rest: positionals.slice(1)
    };
}

/**
 * Second-pass: Parses with command-specific options.
 *
 * @param {string[]} args the command-line arguments to parse.
 * @param {ParseArgsConfig["options"]} [options]
 */
export function parseCommandArgs(args: string[], options?: ParseArgsConfig["options"]): CommandArgs
{
    const { values, positionals } = parseArgs({
        args,
        strict: false,
        allowPositionals: true,
        options: {
            help: { type: "boolean", short: "h" },
            ...options
        }
    });
    return {
        flags: values,
        positionals
    };
}
