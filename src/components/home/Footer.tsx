export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-black">
        <div className="mt-6 pt-6 border-t border-gray-800 text-center max-w-2xl mx-auto">
        </div>
        <div className="container mx-auto px-4 py-4">
            {/* Copyright */}
            <div className="text-gray-500 text-md text-center">
                <p>© {currentYear} PrediFormula 1</p>
                <p className="text-xs mt-1">Todos los derechos reservados</p>
                <p className="text-xs text-gray-600 mt-1">
                Este sitio no está afiliado con Formula 1®
                </p>
            </div>

        </div>
    </footer>
  );
}