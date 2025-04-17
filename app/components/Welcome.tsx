import Image from "next/image";
import welcomeImg from "../../public/welcome.jpeg"
import google from "../../public/Logo.jpeg"
import { signInWithGoogle } from "../lib/auth";

const Welcome = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-7">
            <Image
                src={welcomeImg}
                width={300}
                height={300}
                alt="Welcome Image"
            />
            <hgroup className="text-center font-bold text-2xl">
                <h1>Bienvenid@ a Reader Tracker</h1>
                <h2>Tu librero digital</h2>
            </hgroup>
            <button onClick={signInWithGoogle} className="border-[.5px] border-gray-500 flex items-center justify-center cursor-pointer gap-2 p-4 text-2xl rounded-3xl">
                <Image src={google} alt="Google Logo"
                    width={30}
                    height={30}
                />
                Iniciar con google
            </button>
        </div>
    )
}

export default Welcome