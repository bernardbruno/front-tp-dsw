export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block">
        <div className="pt-12 border-t border-gray-800 text-center max-w-2xl mx-auto">
        </div>
        <div className="container mx-auto px-4 py-4">
            {/* Copyright */}
            <div className="text-gray-500 text-md text-center">
                <p>© {currentYear} PrediFormula 1</p>
                <p className="text-xs text-gray-600 mt-1">
                Este sitio no está afiliado con Formula 1®
                </p>
                <img src="/src/assets/logo.png" alt="Logo" className="mx-auto mt-2 h-8 w-8"/>
            </div>

        </div>
    </footer>
  );
}