"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const {data: session} = useSession()
  const id = session?.user?.id
  const [isAdmin, setIsAdmin] = useState()
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${id}`)
        if(res.ok){
       const data =  await res.json()
          setIsAdmin(data.isAdmin)
          console.log(data.isAdmin)
      }else {
          console.log(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkUser()
  }, [id])
  return (
    <div className="w-64 h-full bg-gray-800 text-gray-100 p-5 shadow-lg">
      <h2 className="border-b border-gray-700 pb-2 mb-4">Kontrol Paneli</h2>
      <ul className="list-none p-0">
        {isAdmin ? (
          // Admin için içerikler
          <>
            <li className="my-4">
              <Link href="/profile" className="text-gray-100 no-underline">
                Randevular
              </Link>
            </li>
            <li className="my-4">
              <Link href="/profile/customers" className="text-gray-100 no-underline">
                Müşteriler
              </Link>
            </li>
            <li className="my-4">
              <Link href="/api/auth/signout" className="text-gray-100 no-underline">
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
              <Link href="/profile" className="text-gray-100 no-underline">
                Randevularım
              </Link>
            </li>
            <li className="my-4">
              <Link href="/randevu" className="text-gray-100 no-underline">
                Yeni Randevu Al
              </Link>
            </li>
            <li className="my-4">
              <Link href="/api/auth/signout" className="text-gray-100 no-underline">
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
