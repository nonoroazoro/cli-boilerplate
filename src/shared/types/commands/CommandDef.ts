import type { ParseArgsConfig } from "node:util";

/**
 * Definition of a CLI command's metadata.
 *
 * Lives in {@link core/registry}.
 */
export interface CommandDef
{
    /**
     * Command name used in CLI invocation.
     */
    name: string;

    /**
     * One-line description shown in help text.
     */
    description: string;

    /**
     * Whether the command keeps stdin open for interaction.
     */
    interactive?: boolean;

    /**
     * Command-specific options passed to `parseArgs`.
     */
    options?: ParseArgsConfig["options"];
}
