import type { CommandDef, CommandEntry } from "../shared/types/commands";

const _commands = new Map<string, CommandEntry>();

/**
 * Registers a command with lazy-loaded command view component.
 *
 * @param {CommandDef} def The command def to register.
 * @param {CommandEntry["load"]} load The command view component to load.
 */
export function registerCommand(def: CommandDef, load: CommandEntry["load"]): void
{
    _commands.set(def.name, { def, load });
}

/**
 * Gets the specified command.
 *
 * @param {string} name The command name.
 */
export function getCommand(name: string): CommandEntry | undefined
{
    return _commands.get(name);
}

/**
 * Retrieve the list of all available commands.
 */
export function getCommands(): CommandDef[]
{
    return Array.from(_commands.values()).map(e => e.def);
}

// Register commands.
registerCommand(
    {
        name: "greet",
        description: "Greet someone with style",
        options: {
            name: { type: "string", short: "n" },
            loud: { type: "boolean", short: "l" }
        }
    },
    async () => import("../ui/views/Greet")
);
