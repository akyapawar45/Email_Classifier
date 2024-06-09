import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        {session ? (
          <>
            <h1 className="text-xl font-bold mb-4">Welcome, {session.user.name}</h1>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-4">Sign in to your account</h1>
            <button
              onClick={() => signIn('google')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
