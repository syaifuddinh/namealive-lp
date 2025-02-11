import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold">
                SORRY
            </h1>
            <p className="text-xl mt-2">
                We have encountered some issue. Please contact administrator.
            </p>
            <Link href="/" className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">
                Go to Home
            </Link>
        </div>
    )
}