"use client";
import { Scissors } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-gray-700 h-16 text-white">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Scissors className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold ml-2 text-white w-8 h-8" />
          <Link href="/">
          <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold ml-2">Nevzat Berber</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>

          {/* User Profile or Login Button */}
          {session?.user ? (
            <li>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={session?.user.name || "User Image"}
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/api/auth/signin">
                <Button>Login</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
