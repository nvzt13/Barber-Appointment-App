import { auth } from '@/auth'
import React from 'react'

const ProfilePage = async () => {
  const getServerSideProps =  async () => {

    const session = await auth();
    if(!session || !session.user.id) {
      return (
        <div>
          Unauthorized
        </div>
      )
    }
    try {
      const res = await fetch(`http//:localhost/app/api/appointment/read?userId=${session.user.id}`)
      if(res.ok) {
        console.log(res.json())
      }else {
        console.log(res.json())
      }
    } catch (error) {
      console.log(error)      
    }
  }
  const data = await getServerSideProps()
  console.log(data)
  return (
    <div>
      profileadsf
    </div>
  )
}

export default ProfilePage