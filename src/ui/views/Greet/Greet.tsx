import { Box, Text } from "ink";

import type { ReactElement } from "react";

import type { CommandProps } from "../../../shared";

/**
 * Example command view: greet someone with style.
 *
 * Usage: cli greet --name World --loud
 */
export function Greet(props: CommandProps): ReactElement
{
    const { flags } = props;
    const name = (flags.name as string) ?? "World";
    const greeting = `Hello, ${name}!`;
    return (
        <Box padding={1}>
            <Text bold={Boolean(flags.loud)} color="green">
                {flags.loud ? greeting.toUpperCase() : greeting}
            </Text>
        </Box>
    );
}
