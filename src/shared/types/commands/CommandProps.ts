/**
 * Props passed to every command view component.
 */
export interface CommandProps
{
    flags: Record<string, boolean | string | undefined>;
    positionals: string[];
}
