import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

export class SafeComponentGuard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("[DIAGNOSTIC] [SafeComponentGuard] getDerivedStateFromError caught:", error?.message, error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      `[DIAGNOSTIC] [SafeComponentGuard] Component error in ${
        this.props.name || "optional feature"
      }:`,
      error?.message,
      error?.stack,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback !== undefined ? this.props.fallback : null;
    }
    return this.props.children;
  }
}
