import { auth } from '@/auth'
import { headers } from 'next/headers';
import React from 'react'
import IndexProfile from './_components/IndexProfile';
import { Appointment } from '@prisma/client';

const ProfilePage = async () => {
  let fetchedUserAppointment: Appointment[] = [];
  const session = await auth();
  
  if (!session || !session.user.id) {
    return (
      <div>
        Unauthorized
      </div>
    );
  }

  try {
    const res = await fetch(`http://localhost:3000/api/v1/user/${session?.user.id}/appointment`, {
      method: "GET",
      headers: await headers(),
    });

    if (res.ok) {
      console.log("Randevular getirildi!");
      fetchedUserAppointment = await res.json();
    } else {
      console.log("Randevular getirilirken bir hata oluştu!");
      console.log(res.status);
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <div>
      <IndexProfile appointments={fetchedUserAppointment.data} />
    </div>
  );
};

export default ProfilePage;
