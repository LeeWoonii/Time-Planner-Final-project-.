function Footer() {
  return (
    <footer className="border-top bg-dark text-light py-3 mt-auto">
      <div className="container d-flex flex-wrap justify-content-between gap-2 small">
        <span>© {new Date().getFullYear()} TimePlanner Pro</span>
        <span>Browser language: {navigator.language}</span>
      </div>
    </footer>
  );
}


export default Footer;
