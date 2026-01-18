import { Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative mt-20 py-12 px-4">
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

            <div className="max-w-xl mx-auto">
                <div className="bg-surface rounded-2xl p-8 shadow-soft border border-border-light text-center">
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-50 rounded-xl">
                        <Heart className="w-6 h-6 text-primary-500" />
                    </div>

                    {/* Text */}
                    <p className="text-text-secondary mb-2">
                        ¿Querés una app a medida para tus necesidades?
                    </p>
                    <p className="text-lg font-semibold text-text-primary mb-4">
                        ¡Hablemos!
                    </p>

                    {/* Links */}
                    <div className="flex items-center justify-center gap-4 text-sm">
                        <a
                            href="mailto:vegajuancontact@gmail.com"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium rounded-lg transition-colors duration-200"
                        >
                            📧 Email
                        </a>
                        <a
                            href="https://www.linkedin.com/in/juanbautistavega/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 hover:bg-accent-100 text-accent-600 font-medium rounded-lg transition-colors duration-200"
                        >
                            💼 LinkedIn
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center text-xs text-text-muted mt-6">
                    Hecho con 🖤 por Juan Bautista Vega
                </p>
            </div>
        </footer>
    );
};
