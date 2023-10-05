import ErrorBoundary from './ErrorBoundary';

export default function ErrorProvider({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
