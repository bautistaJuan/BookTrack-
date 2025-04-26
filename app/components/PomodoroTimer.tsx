import { useState, useEffect } from "react";
const PomodoroTimer = ({ onComplete }: { onComplete: () => void }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(25);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(sessionDuration.toString());
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        onComplete();
                        setIsActive(false);
                    } else {
                        setMinutes(prev => prev - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(prev => prev - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval!);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, onComplete]);

    const toggleTimer = () => {
        if (isPaused) {
            setIsActive(true);
            setIsPaused(false);
        } else {
            setIsActive(!isActive);
        }
    };

    const stopTimer = () => {
        setIsActive(false);
        setIsPaused(false);
        setMinutes(sessionDuration);
        setSeconds(0);
    };

    const handleEditConfirm = () => {
        const newDuration = Math.max(1, Math.min(60, Number(inputValue)));
        setSessionDuration(newDuration);
        setMinutes(newDuration);
        setSeconds(0);
        setEditing(false);
    };

    const TimerDisplay = (
        <div
            className="text-6xl font-bold cursor-pointer"
            onClick={() => !isActive && setEditing(true)}
        >
            {editing && !isActive ? (
                <input
                    type="number"
                    className="text-center w-20 bg-transparent border-b-2 text-4xl focus:outline-none"
                    min={5}
                    max={60}
                    autoFocus
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={handleEditConfirm}
                    onKeyDown={e => e.key === "Enter" && handleEditConfirm()}
                />
            ) : (
                <>
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </>
            )}
        </div>
    );

    return isActive ? (
        <div className="fixed inset-0 z-50 bg-black text-white  flex flex-col items-center justify-center gap-6 transition-all">
            <h2 className="text-2xl font-semibold">A Leer!</h2>
            {TimerDisplay}
            <div className="flex gap-4">
                <button
                    onClick={toggleTimer}
                    className="px-6 py-3 bg-blue-600 rounded-md"
                >
                    Pausar
                </button>
                <button
                    onClick={stopTimer}
                    className="px-6 py-3 bg-red-600 rounded-md"
                >
                    Detener
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Pomodoro</h2>
            {TimerDisplay}

            <div className="flex gap-4">
                <button
                    onClick={toggleTimer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {isPaused ? "Reanudar" : "Iniciar"}
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
