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
    const beneficios = [
        ["🧘‍♂️", "Reduce el estrés", "Solo 6 minutos de lectura pueden disminuir significativamente los niveles de estrés."],
        ["🧠", "Mejora la conectividad cerebral", "Activa múltiples áreas del cerebro, fortaleciendo la comunicación interna."],
        ["📚", "Entrena la memoria", "Recordar tramas y personajes entrena la memoria a corto y largo plazo."],
        ["💡", "Fomenta el pensamiento crítico", "Leer textos profundos estimula el análisis y la reflexión."],
        ["💞", "Estimula la empatía", "Comprender personajes mejora tu inteligencia emocional."],
        ["🎯", "Mejora la concentración", "La lectura habitual mejora tu capacidad de enfocarte por períodos prolongados."],
        ["🧓", "Protege el cerebro con los años", "La lectura constante puede retrasar el deterioro cognitivo y la demencia."]
    ];

    return (
        <>
            <div className="min-h-screen w-full flex flex-col justify-center items-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center gap-6 h-dvh bg-background w-full sm:flex-row  sm:items-center p-11 mb-9"
                >
                    <Image
                        src={welcomeImg}
                        alt="Welcome Image"
                        className="shadow-lg rounded-md max-w-[290px] max-h-[280px]"
                    />
                    <div className="flex flex-col justify-center items-center">
                        <p className="italic text-md sm:text-lg text-center text-textPrimary max-w-md">
                            &quot;La lectura es un viaje, y como todo viaje, nos transforma, nos lleva por caminos que no conocíamos y nos permite ver el mundo con otros ojos.&quot; – Gabriel Rolón
                        </p>
                        <button
                            onClick={signInWithGoogle}
                            className="border border-green-500 bg-white hover:scale-110 active:scale-105 transition-all duration-200 flex items-center justify-center cursor-pointer gap-3 py-3 px-6 text-lg rounded-full shadow-lg mt-6 min-w-[300px]"
                        >
                            <Image src={google} alt="Google Logo" width={24} height={24} />
                            Iniciar con Google
                        </button>
                    </div>
                </motion.div>
                <h2 className="text-2xl mt-8 sm:text-3xl md:text-4xl font-semibold text-center text-textPrimary leading-snug">
                    Descubrí qué podés hacer con <span className="text-primary font-bold">Reader-Tracker</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl p-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-surface rounded-xl shadow-sm border border-border p-6 text-center hover:shadow-md transition"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-primary font-playfair mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-textSecondary text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
                <section className="max-w-3xl mx-auto mt-16 px-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center font-playfair text-primary mb-8">
                        Beneficios de la lectura para tu mente
                    </h2>
                    <ul className="space-y-6">
                        {beneficios.map(([icon, title, desc], i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="flex gap-4 items-start"
                            >
                                <span className="text-2xl">{icon}</span>
                                <div>
                                    <h4 className="text-lg font-semibold text-primary">{title}</h4>
                                    <p className="text-sm text-textSecondary">{desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </section>

            </div>
            <footer className="mt-12 text-center text-sm text-textSecondary w-full">
                <div className="bg-gray-50 border rounded-lg p-4 max-w-xl mx-auto shadow-sm">
                    <p className="mb-1">
                        ¿Querés una app a medida para tus necesidades?{" "}
                        <span className="font-medium text-textPrimary">¡Hablemos!</span>
                    </p>
                    <p>
                        <a
                            href="mailto:vegajuancontact@gmail.com"
                            className="text-accent hover:underline"
                        >
                            vegajuancontact@gmail.com
                        </a>{" "}
                        o{" "}
                        <a
                            href="https://www.linkedin.com/in/juanbautistavega/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                        >
                            LinkedIn
                        </a>
                    </p>
                </div>
            </footer>

        </>

    );
};

export default Welcome;
