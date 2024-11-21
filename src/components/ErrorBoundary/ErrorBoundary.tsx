import React, { Component, ReactNode } from 'react';
import './ErrorBoundary.css';  // Import the CSS for styling

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows a fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service or console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    // Optionally, you can reset the error state to attempt a re-render
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      // Render a friendly error page
      return (
       <div className="error-container bg-red-100 p-6 rounded-lg shadow-lg text-center">
  <img src="/error-icon.png" alt="Error Icon" className="error-icon w-16 h-16 mx-auto mb-4" />
  <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
  <p className="text-gray-700 mb-4">We’re sorry, but there was an issue with this part of the application.</p>
  <button onClick={this.handleRetry} className="error-button bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300">
    Try Again
  </button>
</div>

      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
