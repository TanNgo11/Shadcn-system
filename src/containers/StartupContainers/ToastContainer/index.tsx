import { ToastContainer } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export default () => (
  <ToastContainer
    className="pp-toast-container"
    position="top-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);
