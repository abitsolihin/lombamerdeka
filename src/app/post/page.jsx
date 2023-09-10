import Image from "next/image";
import FormPost from "@/components/Form/FormPost";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ModalLogin from "@/components/Modal/ModalLogin";

const page = async () => {
    const session = await getServerSession(authOption)

    if (session) {
        return <div className="flex items-center justify-center min-h-screen">
            <FormPost />
            <Image className="absolute bottom-0 left-0 right-0 w-full -z-20" src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />
        </div>
    } else {
        return <div className="flex items-center justify-center min-h-screen">
        <ModalLogin />
        <Image className="absolute bottom-0 left-0 right-0 w-full -z-20" src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />
    </div>
    }
};

export default page;
