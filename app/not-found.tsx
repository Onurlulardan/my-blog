import Link from "next/link";
import React from "react";

const NotFound = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        <div className="w-full sm:w-5/6 lg:w-1/2 xl:w-1/3 px-6 text-center">
          <div
            className="py-16 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage:
                "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
            }}
          >
            <h1 className="text-8xl">404</h1>
          </div>

          <div className="mt-8">
            <h3 className="text-4xl">Looks like you&#39;re lost</h3>

            <p>The page you are looking for is not available!</p>

            <Link
              href="/"
              className="inline-block mt-4 text-white bg-primary-dark  px-3 py-2 rounded hover:scale-[0.97] transition duration-100"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
