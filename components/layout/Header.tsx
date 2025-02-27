import { Scissors } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="bg-gray-700 h-16 text-white" >
      <nav className="absolute top-0 left-0 w-full">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <Scissors />
            <Link href="/" > <h1 className="text-2xl font-bold ml-2">Nevzat Berber</h1></Link>
          </div>
          <ul className="flex items-cetter justify-center space-x-8 text-lg">
            <Link href="/" > Home </Link>
            <Link href="/about" > About </Link>
            <Link href="/api/auth/signout" > logout </Link>
            <Button className="lg bg-transparent border-2">Admin</Button>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
