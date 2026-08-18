export default function Footer({ subtitulo }) {
  return (
    <footer className="site-footer">
      <p>AgroBoost © 2026 - FIAP Engenharia de Software</p>
      {subtitulo && <p>{subtitulo}</p>}
    </footer>
  );
}
