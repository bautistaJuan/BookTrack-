import { useState, useEffect, useCallback } from "react";

type TimerState = 'idle' | 'running' | 'paused';

const PomodoroTimer = ({ onComplete }: { onComplete: () => void }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const [sessionDuration, setSessionDuration] = useState(25);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(sessionDuration.toString());

    // Memoizar onComplete para evitar efectos innecesarios
    const memoizedOnComplete = useCallback(onComplete, [onComplete]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerState === 'running') {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer completado
                        setTimerState('idle');
                        memoizedOnComplete();
                        return;
                    } else {
                        setMinutes(prev => prev - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(prev => prev - 1);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerState, minutes, seconds, memoizedOnComplete]);

    const startTimer = () => {
        setTimerState('running');
    };

    const pauseTimer = () => {
        setTimerState('paused');
    };

    const resumeTimer = () => {
        setTimerState('running');
    };

    const resetTimer = () => {
        setTimerState('idle');
        setMinutes(sessionDuration);
        setSeconds(0);
    };

    const handleEditConfirm = () => {
        // Validación más robusta
        const numValue = Number(inputValue);
        if (isNaN(numValue) || inputValue.trim() === '') {
            setInputValue(sessionDuration.toString());
            setEditing(false);
            return;
        }

        const newDuration = Math.max(1, Math.min(60, numValue)); // Numero entre 1 y 60 mins
        setSessionDuration(newDuration);
        setMinutes(newDuration);
        setSeconds(0);
        setInputValue(newDuration.toString());
        setEditing(false);
    };

    const handleEditCancel = () => {
        setInputValue(sessionDuration.toString());
        setEditing(false);
    };

    const canEdit = timerState === 'idle';
    const isRunning = timerState === 'running';
    const isPaused = timerState === 'paused';

    const TimerDisplay = (
        <div
            className="text-6xl font-bold cursor-pointer select-none"
            onClick={() => canEdit && setEditing(true)}
            title={canEdit ? "Click para editar" : "Detén el timer para editar"}
        >
            {editing && canEdit ? (
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="text-center w-24 bg-transparent border-b-2 text-4xl focus:outline-none focus:border-blue-500"
                        min={1}
                        max={60}
                        autoFocus
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onBlur={handleEditConfirm}
                        onKeyDown={e => {
                            if (e.key === "Enter") handleEditConfirm();
                            if (e.key === "Escape") handleEditCancel();
                        }}
                    />
                    <span className="text-4xl">:00</span>
                </div>
            ) : (
                <span className={`${!canEdit ? 'opacity-75' : ''}`}>
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
            )}
        </div>
    );

    // Pantalla completa cuando está corriendo
    if (isRunning) {
        return (
            <div className="fixed font-mono inset-0 z-50 bg-black text-white flex flex-col items-center justify-center gap-6 transition-all">
                <h2 className="text-lg font-semibold">🍅 Modo Enfoque</h2>
                {TimerDisplay}
                <button
                    onClick={pauseTimer}
                    className="px-6 py-3 rounded-md border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                    ⏸ Pausar
                </button>
            </div>
        );
    }

    // Vista normal
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">🍅 Pomodoro</h2>
                {isPaused && (
                    <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        Pausado
                    </span>
                )}
            </div>

            {TimerDisplay}

            {editing && canEdit && (
                <p className="text-xs text-gray-500">
                    Enter para confirmar • Escape para cancelar
                </p>
            )}

            <div className="flex gap-4">
                {timerState === 'idle' ? (
                    <button
                        onClick={startTimer}
                        className="px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                        disabled={editing}
                    >
                        ▶ Iniciar
                    </button>
                ) : isPaused ? (
                    <button
                        onClick={resumeTimer}
                        className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                        ▶ Reanudar
                    </button>
                ) : null}

                {timerState !== 'idle' && (
                    <button
                        onClick={resetTimer}
                        className="px-6 py-3 rounded-md border border-red-600 text-red-600 hover:bg-red-100 transition-colors"
                    >
                        ⏹ Reiniciar
                    </button>
                )}
            </div>
        </div>
    );
};

export default PomodoroTimer;