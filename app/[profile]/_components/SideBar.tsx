import React from "react";
import Link from "next/link";

const SideBar = () => {
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