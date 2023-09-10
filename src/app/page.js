import React from "react"
import Image from "next/image"


export default function Home() {
  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen pt-20 overflow-y-hidden">
      <div className="left flex-1 flex flex-col justify-center items-start gap-4">
        <h1 className="text-[56px] sm:text-[78px] leading-tight">Cari ide lomba
          untuk 17 agustus</h1>
        <p className="text-[12px] sm:text-[18px]">LombaMerdeka dibuat dengan tujuan untuk membantu Anda mencari ide-ide lomba dalam rangka perayaan Hari Kemerdekaan Republik Indonesia pada tanggal 17 Agustus. Melalui platform ini, Anda dapat menemukan berbagai macam ide lomba yang kreatif dan bervariasi untuk memeriahkan peringatan kemerdekaan tersebut. </p>
        <a href="/lomba"><button className="border-[1px] border-gray-900 rounded-md px-5 py-2 hover:bg-gray-900 hover:text-primary">Cari Ide Lomba</button></a>
      </div>
      <div className="right flex-1 lg:flex justify-center -z-10 relative hidden">
        <Image className="absolute -bottom-2" src={'/right.svg'} alt="balap karung" width='450' height='500' priority />
      </div>
      <Image className="absolute bottom-0 left-0 right-0 w-full -z-20" src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />
    </div>
  )
}
