import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

export default function LanguageSwitcher({ inline = false }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (inline) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [inline]);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  function handleSelectLang(code) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  if (inline) {
    return (
      <div className="pt-2">
        <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-2">Language</p>
        <ul className="flex flex-wrap gap-2" role="listbox" aria-label="Language options">
          {languages.map((lang) => (
            <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
              <button
                type="button"
                onClick={() => handleSelectLang(lang.code)}
                className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                  i18n.language === lang.code
                    ? 'text-text-primary bg-white/10 border border-white/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 touch-manipulation"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="uppercase tracking-wider">{current.code}</span>
        <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 py-1 min-w-[140px] rounded-lg bg-background border border-[rgba(255,255,255,0.12)] shadow-xl z-[60]"
          aria-label="Language options"
        >
          {languages.map((lang) => (
            <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
              <button
                type="button"
                onClick={() => handleSelectLang(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors min-h-[44px] touch-manipulation ${
                  i18n.language === lang.code
                    ? 'text-text-primary bg-white/10 font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
