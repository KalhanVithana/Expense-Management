'use client'; 

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  

  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-red-700 bg-gray-50">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2">{error?.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 mt-4 text-white bg-red-600 rounded"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
