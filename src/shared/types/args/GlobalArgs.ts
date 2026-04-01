export interface GlobalArgs
{
    command: string | undefined;
    flags: Record<string, boolean | string | undefined>;
    rest: string[];
}
