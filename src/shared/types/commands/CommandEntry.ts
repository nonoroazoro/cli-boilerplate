import type { ComponentType } from "react";

import type { CommandDef } from "./CommandDef";
import type { CommandProps } from "./CommandProps";

/**
 * A registered command entry with lazy-loaded command view component.
 */
export interface CommandEntry
{
    def: CommandDef;
    load: () => Promise<{ default: ComponentType<CommandProps>; }>;
}
