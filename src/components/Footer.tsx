type FooterProps = {
    className?: string;
};

export default function Footer({
    className = "py-6 text-center text-slate-500 dark:text-slate-400 text-sm font-medium",
}: FooterProps) {
    return (
        <footer className={className}>
            Desarrollado por Fabian Casas {new Date().getFullYear()}
        </footer>
    );
}
