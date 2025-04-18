import { useState, useEffect } from "react";

const PomodoroTimer = ({ onComplete }: { onComplete: () => void }) => {
    const [minutes, setMinutes] = useState(25); // Valor inicial de 25 minutos
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(25); // Duración de la sesión elegida por el usuario

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        onComplete(); // Ejecuta la función cuando el Pomodoro termina
                        setIsActive(false);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval!);
        }

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    }, [isActive, minutes, seconds, onComplete]);

    const toggleTimer = () => {
        if (isPaused) {
            setIsActive(true); // Reactiva el temporizador si está en pausa
            setIsPaused(false);
        } else {
            setIsActive(!isActive); // Inicia o pausa el temporizador
        }
    };

    const stopTimer = () => {
        setIsActive(false); // Detener el temporizador
        setIsPaused(false);
        setMinutes(sessionDuration); // Reiniciar el temporizador a la duración seleccionada
        setSeconds(0);
    };

    const handleSessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDuration = Math.max(5, Math.min(60, Number(event.target.value))); // Limitar entre 5 y 60 minutos
        setSessionDuration(newDuration);
        setMinutes(newDuration);
        setSeconds(0);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Pomodoro</h2>
            <div className="text-2xl font-bold">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>

            {/* Controles */}
            <div className="flex gap-4 mt-2">
                <button
                    onClick={toggleTimer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {isActive ? "Pausar" : isPaused ? "Reanudar" : "Iniciar"}
                </button>

                <button
                    onClick={stopTimer}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Detener
                </button>
            </div>

            {/* Selector de duración de la sesión */}
            <div className="mt-4">
                <label htmlFor="sessionDuration" className="mr-2">Duración de la sesión (minutos):</label>
                <input
                    id="sessionDuration"
                    type="number"
                    value={sessionDuration}
                    onChange={handleSessionChange}
                    min="5"
                    max="60"
                    className="w-16 text-center border rounded-md"
                />
            </div>
        </div>
    );
};

export default PomodoroTimer;
