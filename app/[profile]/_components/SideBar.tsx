"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SideBar = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="w-64 h-full bg-gray-800 text-gray-100 p-5 shadow-lg">
      <h2 className="border-b border-gray-700 pb-2 mb-4">Kontrol Paneli</h2>
      <ul className="list-none p-0">
        {isAdmin ? (
          // Admin için içerikler
          <>
            <li className="my-4">
              <Link href="/admin/add-project" className="text-gray-100 no-underline">
                Randevular
              </Link>
            </li>
            <li className="my-4">
              <Link href="/profile/müşteriler" className="text-gray-100 no-underline">
                Müşteriler
              </Link>
            </li>
            <li className="my-4">
              <Link href="/admin/settings" className="text-gray-100 no-underline">
              <Button variant="destructive" size="sm">
              Çıkış Yap
              </Button>
              </Link>
            </li>
          </>
        ) : (
          // Kullanıcı için içerikler
          <>
            <li className="my-4">
              <Link href="/user/dashboard" className="text-gray-100 no-underline">
                Randevularım
              </Link>
            </li>
            <li className="my-4">
              <Link href="/user/profile" className="text-gray-100 no-underline">
                Yeni Randevu Al
              </Link>
            </li>
            <li className="my-4">
              <Link href="/user/settings" className="text-gray-100 no-underline">
              <Button variant="destructive" size="sm">
              Çıkış Yap
              </Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
