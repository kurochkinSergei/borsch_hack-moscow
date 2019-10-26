/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { ErrorInfo } from 'react';

const SEVERITY_LEVEL_ERROR = 'error';
const SEVERITY_LEVEL_WARNING = 'warning';

interface ISettings {
  severityLevel?: 'error' | 'warning'
}

class Logger {
  severityLevel: 'error' | 'warning';

  constructor({ severityLevel = 'error' }: ISettings) {
    this.severityLevel = severityLevel;
  }

  error(error: Error, errorInfo: ErrorInfo) {
    if (this.severityLevel === SEVERITY_LEVEL_ERROR) {
      // Here we will send data to Error collector like Sentry
      console.error(error, errorInfo);
    }
  }

  warn(error: Error, errorInfo: ErrorInfo) {
    if (this.severityLevel === SEVERITY_LEVEL_ERROR
      || this.severityLevel === SEVERITY_LEVEL_WARNING) {
      console.warn(error, errorInfo);
    }
  }
}

export default Logger;
