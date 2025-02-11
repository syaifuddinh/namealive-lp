import Link from "next/link";

export default function Custom404() {
    return (
        <div className="bg-gray200 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-2">
                Page Not Found
            </p>
            <Link href="/" className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">
                Go to Home
            </Link>
        </div>
    )
}