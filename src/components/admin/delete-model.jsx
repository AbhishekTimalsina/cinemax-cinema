export default function DeleteModel({ onCancel, onDelete, isDeleting }) {
  return (
    <>
      <div className="p-8 bg-gray-600 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 space-y-4 rounded shadow-md shadow-black">
        <p className="font-bold">Are you sure you want to delete movie?</p>
        <div className="flex justify-center gap-5">
          <button
            className={`py-2 bg-gray-700 rounded px-6 ${
              isDeleting ? "opacity-40" : ""
            }`}
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className={`py-2 bg-red-600 rounded px-6 ${
              isDeleting ? "opacity-40" : ""
            }`}
            disabled={isDeleting}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="absolute inset-0 h-[100%] w-[100%] bg-black/20"></div>
    </>
  );
}
