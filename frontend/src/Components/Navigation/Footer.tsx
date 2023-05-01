const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className="position-sticky">
        <p>
          © {currentYear} :
          <a href="https://www.edwinsilvestrewebsite.com/">Edwin Silvestre</a>
          <a href="https://github.com/EdwinTJ/rategames">
            <i className="bi bi-github"></i>
          </a>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
