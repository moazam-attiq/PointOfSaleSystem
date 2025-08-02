import { useRef } from 'react';

export default function DeleteModal({ show, onClose, onConfirm }) {
  const modalRef = useRef(null);

  if (!show) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray !bg-opacity-"
    >
      <div className="!bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal !text-gray-500 dark:!text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-3">
            <button
              onClick={onConfirm}
              className="!text-white !bg-[#91C8E4] hover:!bg-[#4682A9] focus:ring-4 focus:ring-red-300 dark:focus:ring-[#749BC2] !font-medium !rounded-lg text-sm px-5 py-2.5"
            >
              Yes, I’m sure
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium !text-gray-900 !bg-gray-100 border !border-gray-200 !rounded-lg hover:!bg-gray-100 hover:!text-[#91C8E4] dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
