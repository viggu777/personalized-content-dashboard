"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { RetryButton, StatusMessage } from "./StatusMessage";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI. Defaults to a retryable status message. */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time errors in its subtree so one broken card or feed can't
 * blank the whole app. Resetting re-mounts the children.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface to the console (and any attached monitoring) for debugging.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <StatusMessage
            tone="error"
            icon={<FiAlertTriangle className="h-10 w-10" />}
            title="Something went wrong"
            description="An unexpected error occurred while rendering this section."
            action={<RetryButton onClick={this.reset} label="Try again" />}
          />
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
