"use client";

// Importing the entire NEXT_AUTH module from 'next-auth/react' for better visibility.
// This ensures that the functionality from NextAuth.js is clearly visible.
import * as NEXT_AUTH from "next-auth/react";

function ProfileComponent() {
	const { data: session, status } = NEXT_AUTH.useSession();

	if (status === "loading") {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold tracking-tight">Loading...</h1>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold tracking-tight">Not logged in yet.</h1>
				<p className="mt-4 max-w-3xl text-xl">
					Use your Microsoft account registered in Entra ID to log in.
				</p>
			</div>
		);
	}

	const userName = session?.user?.name;
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 className="text-4xl font-extrabold tracking-tight">It works!</h1>
			<p className="mt-4 max-w-3xl text-xl">
                Welcome back <b>{userName || "Invalid user name"}</b>,
                <br/>
                you are now logged in with Entra ID.
            </p>

            {/* Display the user's email address */}
            <p className="mt-8 max-w-3xl text-xl">
                Your email address is <b>{session?.user?.email || "Invalid email"}</b>
            </p>
        </div>
	);
}

function ActionComponent() {
	const { status } = NEXT_AUTH.useSession();

	return (
		<div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
			{status === "authenticated" ? (
				<button
					onClick={ () => NEXT_AUTH.signOut() }
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					Log out
				</button>
			) : (
				<button
					onClick={ () => NEXT_AUTH.signIn("azure-ad") }
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Log in with Entra ID
				</button>
			)}
		</div>
	);
}

export default function Home() {
	return (
		<NEXT_AUTH.SessionProvider>
			<div className="min-h-screen flex items-center bg-gray-900 text-white">
				<div className="max-w-2xl w-full mx-auto">
					<ProfileComponent />

					{/* Action Buttons */}
					<ActionComponent />
				</div>
			</div>
		</NEXT_AUTH.SessionProvider>
	);
}
