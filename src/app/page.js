"use client";
import ToastContainer from "./components/ToastContainer";
import useToast from "./hooks/useToast";

const Home = () => {
  const { toasts, addToast, removeToast } = useToast();

  const showToast = (type) => {
    addToast(`This is a notification ${type} message`, type);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-center items-center md:items-end p-4">
      <div className="bg-white w-full md:w-72 h-auto md:mb-4">
        <div className="flex justify-center items-center flex-col gap-4 px-4 py-6 md:px-12 md:py-12">
          <button
            onClick={() => showToast("success")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-4/5"
          >
            Show Success
          </button>
          <button
            onClick={() => showToast("warning")}
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 w-full md:w-4/5"
          >
            Show Warning
          </button>
          <button
            onClick={() => showToast("error")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-4/5"
          >
            Show Error
          </button>
          <button
            onClick={() => showToast("info")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-4/5"
          >
            Show Info
          </button>
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <ToastContainer toasts={toasts} onRemove={removeToast} position={'top-left'} />
      </div>
    </div>
  );
};

export default Home;
