import { defineCommand } from "citty";

export const greet = defineCommand({
    meta: {
        name: "greet",
        description: "Greet someone with style"
    },
    args: {
        name: { type: "string", description: "Name to greet" },
        loud: { type: "boolean", description: "Use loud greeting" }
    },
    async run({ args })
    {
        const { renderView } = await import("../../ui/render/render");
        const { Greet } = await import("../../ui/views/Greet");
        await renderView(Greet, {
            flags: { name: args.name, loud: args.loud },
            positionals: []
        });
    }
});
