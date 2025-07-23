import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-110 active:scale-95"
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  ) : null;
} 