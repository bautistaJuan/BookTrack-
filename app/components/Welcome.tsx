import Image from "next/image";
import welcomeImg from "../../public/welcome-hero.png";
import google from "../../public/Logo.jpeg";
import { signInWithGoogle } from "../lib/auth";
import { motion } from "framer-motion";

const Welcome = () => {
    const features = [
        {
            icon: "📖",
            title: "Registro de lecturas",
            description: "Llevá un control organizado de tus libros leídos y por leer.",
        },
        {
            icon: "⏳",
            title: "Modo Pomodoro",
            description: "Usá un temporizador para mantenerte enfocado mientras leés.",
        },
        {
            icon: "📊",
            title: "Tu progreso lector",
            description: "Visualizá gráficas y datos sobre tu avance a lo largo del tiempo.",
        },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 px-4 py-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
            >
                <Image
                    src={welcomeImg}
                    width={280}
                    height={280}
                    alt="Welcome Image"
                    className="shadow-lg rounded-md"
                />

                <hgroup className="text-center font-bold text-2xl">
                    <h1 className="text-primary text-4xl">Reader Tracker</h1>
                    <h2 className="text-lg font-normal text-textSecondary">
                        Tu librero digital
                    </h2>
                </hgroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-surface rounded-xl shadow-sm border border-border p-6 text-center hover:shadow-md transition"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-primary font-playfair mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-textSecondary text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <p className="italic text-center text-textSecondary max-w-md">
                    &quot;La lectura es un viaje, y como todo viaje, nos transforma, nos lleva por caminos que no conocíamos y nos permite ver el mundo con otros ojos.&quot; – Gabriel Rolón
                </p>
                <button
                    onClick={signInWithGoogle}
                    className="border border-gray-500 bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center cursor-pointer gap-3 py-3 px-6 text-lg rounded-full shadow-sm mt-6"
                >
                    <Image src={google} alt="Google Logo" width={24} height={24} />
                    Iniciar con Google
                </button>
            </motion.div>
        </div>
    );
};

export default Welcome;
