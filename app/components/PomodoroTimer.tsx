"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, X } from "lucide-react";
import { PomodoroTimerProps } from "@app/types/types";

type TimerState = "idle" | "running" | "paused";
const noop = () => undefined;

const PomodoroTimer = ({ onComplete = noop }: PomodoroTimerProps) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const [sessionDuration, setSessionDuration] = useState(25);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(sessionDuration.toString());

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerState === 'running') {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setTimerState('idle');
                        onComplete();
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
    }, [timerState, minutes, seconds, onComplete]);

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
                className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
                style={{ background: "linear-gradient(135deg, #051F20 0%, #235347 50%, #051F20 100%)" }}
                role="dialog"
                aria-modal="true"
                aria-label="Temporizador de lectura en curso"
            >
                {/* Close/minimize hint */}
                <div className="absolute top-6 right-6">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={pauseTimer}
                        className="p-3 text-primary-300 hover:text-primary-100 hover:bg-white/10 rounded-xl transition-colors"
                        aria-label="Pausar y salir del modo enfoque"
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
                    <h2 className="text-2xl font-semibold text-primary-100">Modo Enfoque</h2>
                </motion.div>

                {/* Circular Progress */}
                <div className="relative flex items-center justify-center">
                    <svg className="w-72 h-72 -rotate-90" aria-hidden="true">
                        {/* Background circle */}
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            fill="none"
                            stroke="rgba(142,182,155,0.15)"
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
                                <stop offset="0%" stopColor="#8EB69B" />
                                <stop offset="100%" stopColor="#DAF1DE" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Time display */}
                    <div className="absolute flex flex-col items-center" aria-live="off">
                        <span className="text-7xl font-bold font-mono tracking-tight" style={{ color: "#DAF1DE" }}>
                            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                        </span>
                        <span className="text-primary-300 text-sm mt-2">minutos restantes</span>
                    </div>
                </div>

                {/* Pause button */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pauseTimer}
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border font-semibold rounded-2xl transition-colors"
                    style={{ borderColor: "rgba(142,182,155,0.3)", color: "#DAF1DE" }}
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
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
                    <Timer className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="text-lg font-semibold" style={{ color: "#051F20" }}>Pomodoro Timer</h2>
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
            <div className="text-6xl font-bold font-mono tracking-tight">
                {editing && canEdit ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="text-center w-24 bg-transparent border-b-2 border-primary-500 text-5xl focus:outline-none"
                            style={{ color: "#051F20" }}
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
                        <span className="text-5xl" style={{ color: "#051F20" }}>:00</span>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => canEdit && setEditing(true)}
                        disabled={!canEdit}
                        className="rounded-lg transition-colors enabled:hover:text-primary-500 disabled:cursor-default"
                        style={{ color: !canEdit ? "#8EB69B" : "#051F20" }}
                        aria-label={canEdit ? `Editar duración, actualmente ${minutes} minutos` : `${minutes} minutos y ${seconds} segundos restantes`}
                    >
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </button>
                )}
            </div>

            {/* Edit hint */}
            <AnimatePresence>
                {editing && canEdit && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-primary-300"
                    >
                        Enter para confirmar • Escape para cancelar
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3">
                {timerState === 'idle' ? (
                    <motion.button
                        type="button"
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
                        type="button"
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
                        type="button"
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
