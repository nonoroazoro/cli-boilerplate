import { render } from "ink";

import type { ComponentType } from "react";

import type { RenderOptions } from "./RenderOptions";
import type { CommandProps } from "../../shared";

/**
 * Renders a command view component with ink.
 *
 * @param View The React component to render.
 * @param props The command props to pass.
 * @param options Render options.
 */
export async function renderView(
    View: ComponentType<CommandProps>,
    props: CommandProps,
    options?: RenderOptions
): Promise<void>
{
    const instance = render(
        <View flags={props.flags} positionals={props.positionals} />
    );

    if (options?.interactive)
    {
        await instance.waitUntilExit();
    }
    else
    {
        instance.unmount();
    }
}
