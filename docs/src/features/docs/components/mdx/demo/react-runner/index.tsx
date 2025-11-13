'use client';
import { createElement, useEffect, useRef, useState } from 'react';
import { Component } from 'react';

import { generateElement } from './helpers';

import type { ReactElement } from 'react';
import type { RunnerOptions, Scope } from './types';

type Params = RunnerOptions & {
  disableCache?: boolean;
};

export const useRunner = ({ code, scope, disableCache }: Params) => {
  const elementRef = useRef<ReactElement | null>(null);

  const [state, setState] = useState<{
    element: ReactElement | null;
    error: string | null;
  }>(() => {
    const element = createElement(Runner, {
      code,
      scope,
      onRendered: (error: any) => {
        if (error) {
          // eslint-disable-next-line react-hooks/immutability
          setState({
            element: disableCache ? null : elementRef.current,
            error: error.toString(),
          });
        } else {
          elementRef.current = element;
        }
      },
    });
    return { element, error: null };
  });

  useEffect(() => {
    const element = createElement(Runner, {
      code,
      scope,
      onRendered: (error: any) => {
        if (error) {
          setState({
            element: disableCache ? null : elementRef.current,
            error: error.toString(),
          });
        } else {
          elementRef.current = element;
        }
      },
    });
    setState({ element, error: null });
  }, [code, scope, disableCache]);

  return state;
};

type RunnerProps = RunnerOptions & {
  onRendered?: (error?: Error) => void;
};

type RunnerState = {
  element: ReactElement | null;
  error: Error | null;
  prevCode: string | null;
  prevScope: Scope | undefined;
};

class Runner extends Component<RunnerProps, RunnerState> {
  state: RunnerState = {
    element: null,
    error: null,
    prevCode: null,
    prevScope: undefined,
  };

  static getDerivedStateFromProps(
    props: RunnerProps,
    state: RunnerState,
  ): Partial<RunnerState> | null {
    // only regenerate on code/scope change
    if (state.prevCode === props.code && state.prevScope === props.scope) {
      return null;
    }

    try {
      return {
        element: generateElement(props),
        error: null,
        prevCode: props.code,
        prevScope: props.scope,
      };
    } catch (error: unknown) {
      return {
        element: null,
        error: error as Error,
        prevCode: props.code,
        prevScope: props.scope,
      };
    }
  }

  static getDerivedStateFromError(error: Error): Partial<RunnerState> {
    return { error };
  }

  componentDidMount() {
    this.props.onRendered?.(this.state.error || undefined);
  }

  shouldComponentUpdate(nextProps: RunnerProps, nextState: RunnerState) {
    return (
      nextProps.code !== this.props.code ||
      nextProps.scope !== this.props.scope ||
      nextState.error !== this.state.error
    );
  }

  componentDidUpdate() {
    this.props.onRendered?.(this.state.error || undefined);
  }

  render() {
    return this.state.error ? null : this.state.element;
  }
}
