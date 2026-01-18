"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, X } from "lucide-react";

type TimerState = 'idle' | 'running' | 'paused';

const PomodoroTimer = ({ onComplete = () => { } }: { onComplete?: () => void }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const [sessionDuration, setSessionDuration] = useState(25);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(sessionDuration.toString());

    const memoizedOnComplete = useCallback(onComplete, [onComplete]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerState === 'running') {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
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

    const startTimer = () => setTimerState('running');
    const pauseTimer = () => setTimerState('paused');
    const resumeTimer = () => setTimerState('running');

    const resetTimer = () => {
        setTimerState('idle');
        setMinutes(sessionDuration);
        setSeconds(0);
    };

    const handleEditConfirm = () => {
        const numValue = Number(inputValue);
        if (isNaN(numValue) || inputValue.trim() === '') {
            setInputValue(sessionDuration.toString());
            setEditing(false);
            return;
        }

        const newDuration = Math.max(1, Math.min(60, numValue));
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

    // Calculate progress percentage
    const totalSeconds = sessionDuration * 60;
    const remainingSeconds = minutes * 60 + seconds;
    const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

    // Full screen focus mode
    if (isRunning) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center gap-8"
            >
                {/* Close/minimize hint */}
                <div className="absolute top-6 right-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={pauseTimer}
                        className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={24} />
                    </motion.button>
                </div>

                {/* Title */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3"
                >
                    <span className="text-4xl">🍅</span>
                    <h2 className="text-2xl font-semibold text-white">Modo Enfoque</h2>
                </motion.div>

                {/* Circular Progress */}
                <div className="relative">
                    <svg className="w-72 h-72 -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="144"
                            cy="144"
                            r="130"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={816.8}
                            initial={{ strokeDashoffset: 816.8 }}
                            animate={{ strokeDashoffset: 816.8 - (816.8 * progress) / 100 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Time display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-7xl font-bold text-white font-mono tracking-tight">
                            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                        </span>
                        <span className="text-slate-400 text-sm mt-2">minutos restantes</span>
                    </div>
                </div>

                {/* Pause button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pauseTimer}
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl transition-colors"
                >
                    <Pause size={20} />
                    Pausar
                </motion.button>
            </motion.div>
        );
    }

    // Normal view
    return (
        <div className="flex flex-col items-center gap-6 py-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-50 rounded-xl">
                    <Timer className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-text-primary">Pomodoro Timer</h2>
                <AnimatePresence>
                    {isPaused && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full"
                        >
                            Pausado
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Timer Display */}
            <div
                className={`text-6xl font-bold font-mono tracking-tight ${canEdit ? 'cursor-pointer hover:text-primary-600' : ''} transition-colors`}
                onClick={() => canEdit && setEditing(true)}
                title={canEdit ? "Click para editar" : "Detén el timer para editar"}
            >
                {editing && canEdit ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="text-center w-24 bg-transparent border-b-2 border-primary-400 text-5xl focus:outline-none text-text-primary"
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
                        <span className="text-5xl text-text-primary">:00</span>
                    </div>
                ) : (
                    <span className={`${!canEdit ? 'text-text-muted' : 'text-text-primary'}`}>
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </span>
                )}
            </div>

            {/* Edit hint */}
            <AnimatePresence>
                {editing && canEdit && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-text-muted"
                    >
                        Enter para confirmar • Escape para cancelar
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3">
                {timerState === 'idle' ? (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={startTimer}
                        disabled={editing}
                        className="flex items-center gap-2 px-8 py-4 btn-primary disabled:opacity-50"
                    >
                        <Play size={20} />
                        Iniciar
                    </motion.button>
                ) : isPaused ? (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={resumeTimer}
                        className="flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-soft"
                    >
                        <Play size={20} />
                        Reanudar
                    </motion.button>
                ) : null}

                {timerState !== 'idle' && (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={resetTimer}
                        className="flex items-center gap-2 px-6 py-4 border-2 border-danger text-danger font-semibold rounded-xl hover:bg-danger-light/30 transition-colors"
                    >
                        <RotateCcw size={18} />
                        Reiniciar
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default PomodoroTimer;