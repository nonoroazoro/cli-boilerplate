export interface CommandArgs
{
    flags: Record<string, boolean | string | undefined>;
    positionals: string[];
}
