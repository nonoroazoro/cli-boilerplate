import { Box, Text } from "ink";
import { Component } from "react";

import type { ReactNode } from "react";

export interface ErrorBoundaryProps
{
    readonly children: ReactNode;
}

export interface ErrorBoundaryState
{
    error: Error | null;
}

/**
 * Catches errors and displays in the terminal.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>
{
    override state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState
    {
        return { error };
    }

    override render(): React.ReactNode
    {
        if (this.state.error)
        {
            return (
                <Box flexDirection="column" padding={1}>
                    <Text bold color="red">
                        Error: {this.state.error.message}
                    </Text>
                    {this.state.error.stack ? <Text dimColor>{this.state.error.stack}</Text> : null}
                </Box>
            );
        }
        return this.props.children;
    }
}
