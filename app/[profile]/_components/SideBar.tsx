"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useCRUD from "@/hooks/useCRUD";

const SideBar = () => {
  const { data: session } = useSession();
  const [isAdmin, { responseData, loading, error }] = useCRUD();
  const [authorized, setAuthorized] = useState(false);

  // Admin kontrolünü sadece session varsa yapıyoruz
  useEffect(() => {
    if (session?.user) {
      isAdmin("/api/user/is-admin", "read", null);
    }
  }, [session?.user, isAdmin]);

  // Eğer admin bilgisi gelirse, authorized durumu güncelleniyor
  useEffect(() => {
    if (responseData?.isAdmin) {
      setAuthorized(true);
    }
  }, [responseData]);

  // Unauthorized kontrolü
  if (!session?.user) {
    return <div>Unauthorized</div>;
  }

  if (!authorized) {
    return <div>Loading...</div>; // Admin kontrolü yapılırken loading gösterilebilir
  }

  return (
    <div className="w-64 h-full bg-gray-800 text-gray-100 p-5 shadow-lg">
      <h2 className="border-b border-gray-700 pb-2 mb-4">Nevzat Atalay</h2>
      <ul className="list-none p-0">
        <li className="my-4">
          <Link
            href="/admin/add-project"
            className="text-gray-100 no-underline"
          >
            Proje Ekle
          </Link>
        </li>
        <li className="my-4">
          <Link href="/admin/statistics" className="text-gray-100 no-underline">
            İstatistikleri Gör
          </Link>
        </li>
        <li className="my-4">
          <Link href="/admin/settings" className="text-gray-100 no-underline">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;