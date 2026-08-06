import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white pt-24 pb-12 border-t border-neutral-900 mt-auto overflow-hidden bg-neutral-950">
      
      {/* Static Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://framerusercontent.com/images/DaujIxGV3kuIKq2CePL4JZDnJWU.jpg"
          alt="Footer background"
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
        {/* Dark overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">ALMEDIN BAU</h3>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Ihr zuverlässiger Partner für Premium-Bauprojekte in Dresden und Umgebung.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm text-neutral-500">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-neutral-300 hover:text-white transition-colors">Startseite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm text-neutral-500">Kontakt</h4>
            <ul className="space-y-4">
              <li className="text-neutral-300">Musterstraße 1<br/>01067 Dresden</li>
              <li><a href="mailto:info@almedin-bau.de" className="text-neutral-300 hover:text-white transition-colors">info@almedin-bau.de</a></li>
              <li><a href="tel:+49351000000" className="text-neutral-300 hover:text-white transition-colors">+49 351 000000</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {currentYear} Almedin Bau GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
