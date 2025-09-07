import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">Where to go?</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600">Party</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Music</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Cinema</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Sport</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Contacts</a>
          </nav>

          {/* Right Side Auth Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hi, {user.email || "User email"}
                </span>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-purple-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
