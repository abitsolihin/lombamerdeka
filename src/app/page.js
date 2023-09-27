import React from "react"
import Image from "next/image"
import { pixelAnimation } from '../utils/animation'


export default function Home() {

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen pt-20 overflow-y-hidden">
      <div className="left flex-1 flex flex-col justify-center items-start gap-4">
        <h1 className="text-[56px] sm:text-[78px] leading-tight">Cari ide lomba
          untuk 17 agustus</h1>
        <p className="text-[12px] sm:text-[18px] text-gray-500">LombaMerdeka dibuat dengan tujuan untuk membantu Anda mencari ide-ide lomba dalam rangka perayaan Hari Kemerdekaan Republik Indonesia pada tanggal 17 Agustus. Melalui platform ini, Anda dapat menemukan berbagai macam ide lomba yang kreatif dan bervariasi untuk memeriahkan peringatan kemerdekaan tersebut. </p>
        <a className="group" href="/lomba"><button className={pixelAnimation}>Cari Ide Lomba</button></a>
      </div>
      <div className="right flex-1 lg:flex justify-center -z-10 relative hidden">
        <Image className="absolute -bottom-2 min-w-[250px] max-w-[450px]" src={'/right.svg'} alt="balap karung" fill priority />
      </div>
      <Image className="absolute bottom-0 left-0 right-0 w-full -z-20 " src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />
      <Image className="absolute top-20 left-4 w-8 -z-20 hidden md:flex" src={'/dashed.svg'} alt="balap karung" width='128' height='378' priority />
      <Image className="absolute bottom-60 right-4 w-8 -z-20 hidden md:flex" src={'/dashed.svg'} alt="balap karung" width='128' height='378' priority />
    </div>
  )
}
