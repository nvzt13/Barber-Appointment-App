import { auth } from '@/auth'
import { headers } from 'next/headers';
import React from 'react'

const ProfilePage = async () => {
    const session = await auth();
    if(!session || !session.user.id) {
      return (
        <div>
          Unauthorized
        </div>
      )
    }
    try {
      const res = await fetch(`http://localhost/api/v1/user/${session?.user?.id}/appointmet`, {
        method: "GET",
        headers: await headers()
      })
      if(res.ok) {
        console.log("Randevular getirildi!")
      }else {
        console.log("Randevular getirilirken bir hata oluştu!")
        console.log(res)
      }
    } catch (error) {
      console.log(error)      
  }
  return (
    <div>
      profileadsf
    </div>
  )
}

export default ProfilePage