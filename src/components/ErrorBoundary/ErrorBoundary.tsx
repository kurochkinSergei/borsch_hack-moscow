import React, { ErrorInfo, ReactNode, ReactNodeArray } from 'react';
import Logger from 'utils/Logger';

interface IProps {
  children: ReactNode | ReactNodeArray,
  logger: Logger,
}

interface IState {
  hasError: boolean
}

const ApplicationError = () => <h1>Oops... Something went wrong.</h1>;

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { logger } = this.props;
    // Here we should provide all info for debug
    logger.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ApplicationError />;
    }
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
