import { useState, useEffect } from "react";

const ErrorDisplay = ({ message, onDismiss }) => {

  useEffect(() => {
    if (!message) return;

    // Hide the error after 5 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    // Clean up old timer if message changes
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  // If there is no message, show nothing
  if (!message) return null;

  return (
    <div className="error-display">
      <div className="error-content">
        <span className="error-message">{message}</span>
        <span className="error-progress"></span>
      </div>
    </div>
  );
};

// Custom hook to control errors
export const useError = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const showError = (message) => {
    setErrorMessage(message);
  };

  const dismissError = () => {
    setErrorMessage(null);
  };

  return {
    // Component that shows the error box
    ErrorDisplay: () => (
      <ErrorDisplay
        message={errorMessage}
        onDismiss={dismissError}
      />
    ),

    // Functions to control the error
    showError,
    dismissError,
  };
};

export default ErrorDisplay;
