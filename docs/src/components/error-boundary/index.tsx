import { Component } from 'react';

import type { PropsWithChildren, ReactElement } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type RejectedFallbackFuncType = ({
  error,
  reset,
}: {
  error: Error | null;
  reset: () => void;
}) => ReactElement;

type Props = PropsWithChildren<{
  fallback: RejectedFallbackFuncType;
  resultKey?: Array<string>;
  className?: string;
  onReset?: () => void;
  [key: string]: unknown;
}>;

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  initState: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  constructor(props: Props) {
    super(props);
    this.state = this.initState;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    const { hasError } = this.state;
    const { resetKey } = this.props;

    if (!hasError) return;

    if (prevProps.resetKey !== resetKey) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary() {
    const { onReset } = this.props;

    this.setState(this.initState);
    if (onReset) {
      onReset();
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return fallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }
    return children;
  }
}

export default ErrorBoundary;
