declare const NAME: string;
declare const VERSION: string;

const pkg = typeof NAME === "undefined" ? await _loadPackageJSON() : undefined;

export const name = pkg?.name ?? NAME;
export const version = pkg?.version ?? VERSION;

async function _loadPackageJSON(): Promise<{ name: string; version: string; }>
{
    const file = Bun.file(new URL("../../package.json", import.meta.url));
    return file.json();
}
