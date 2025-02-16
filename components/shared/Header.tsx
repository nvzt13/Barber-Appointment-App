import { Scissors } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  
  return (
    <section className="bg-headerImage bg-cover bg-center h-screen w-full text-white relative">


      <div className="container mx-auto h-full flex flex-col items-center justify-center text-center space-y-6">
        <h2 className="text-6xl font-bold">Nevzat Berber</h2>
        <p className="text-2xl">Herkes için sağlık ve güzellik</p>
        <Button type='button'  className="lg bg-transparent border-2 "><Link href={'/randevu'}>
        Randevu Al</Link></Button>
      </div>
    </section>
  )
}

export default Header
