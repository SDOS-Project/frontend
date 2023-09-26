import { ToastContainer } from 'react-toastify';

function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

export default ToastProvider;
