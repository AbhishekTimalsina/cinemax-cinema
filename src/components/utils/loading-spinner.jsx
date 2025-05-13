export default function LoadingSpinner() {
  return (
    <div className="h-full flex flex-col gap-4 items-center mt-[20vh]">
      <div className="w-16 h-16 border-4 border-solid  border-t-transparent rounded-full animate-spin"></div>
      <p className=" text-lg font-medium">Loading...</p>
    </div>
  );
}
