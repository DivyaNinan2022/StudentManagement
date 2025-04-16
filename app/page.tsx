import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 gap-16 bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
          Welcome to Task Management System
        </h1>
        <p className="text-lg text-gray-600 max-w-md text-center sm:text-left">
          Please <span className="text-blue-600 font-semibold">login here</span>{" "}
          to access your tasks, manage deadlines, and collaborate efficiently.
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">
          <Link
            href="/login"
            prefetch={false}
            className="login-link text-sm"
          >
          Login
          </Link>
        </button>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-500 text-sm">
        <h2>© 2025 TaskManager Inc.</h2>
        <span>|</span>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </footer>
    </div>
  );
}
