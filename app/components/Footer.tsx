export const Footer = () => {
    return (
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
    );
};
