import Link from "next/link";
export default function NotFound() {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-white">
        <h1 className="mb-2 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-4 text-lg">Sorry, we couldn’t find the page you were looking for.</p>
        <Link
          href="/"
          className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Go to Homepage
        </Link>
      </body>
    </html>
  );
}
