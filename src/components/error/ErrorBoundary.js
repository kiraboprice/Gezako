import {Component} from "react";
import React from "react";
import {Link} from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Link to={'/'} > <h4>Something went wrong. Click HERE to return to Gezako Home</h4></Link>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary
