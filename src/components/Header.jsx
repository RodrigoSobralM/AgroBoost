import { useState } from "react";

const links = [
  { href: "#/", texto: "Home" },
  { href: "#/sistema", texto: "Sistema" },
  { href: "#/clima", texto: "Clima" },
  { href: "#/fale-conosco", texto: "Fale Conosco" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-row">
          <div className="brand">
            <svg className="icon brand-icon" viewBox="0 0 24 24">
              <path d="M5 19c0-7 5-13 14-14 1 9-5 15-14 14Z" />
              <path d="M5 19c3-5 7-8 11-9" />
            </svg>

            <div>
              <h1 className="brand-title">AgroBoost</h1>
              <p className="brand-subtitle">Consultor Agrícola Digital</p>
            </div>
          </div>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          <nav className="desktop-nav">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.texto}
              </a>
            ))}
          </nav>
        </div>

        <nav className={`mobile-nav${menuAberto ? "" : " hidden"}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
            >
              {link.texto}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
