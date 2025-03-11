import { auth } from '@/auth'
import { headers } from 'next/headers';
import React from 'react'
import IndexProfile from './_components/IndexProfile';
import { Appointment } from '@prisma/client';

const ProfilePage = async () => {
  let fetchedUserAppointment: Appointment[] = [];
  const session = await auth();
  console.log(session)
  console.log(session?.user?.id)
  if (!session || !session.user.id) {
    return (
      <div>
        Unauthorized
      </div>
    );
  }

  try {
    const res = await fetch(`https://barber-appointment-app.vercel.app/api/v1/user/${session?.user?.id}/appointment`, {
      method: "GET",
      headers: await headers(),
    });

    if (res.ok) {
      console.log("Randevular getirildi!");
      const response = await res.json();
      fetchedUserAppointment = response.data
      console.log(res)
    } else {
      console.log("Randevular getirilirken bir hata oluştu!");
      console.log(res)
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <div>
      <IndexProfile appointments={fetchedUserAppointment} />
    </div>
  );
};

export default ProfilePage;
