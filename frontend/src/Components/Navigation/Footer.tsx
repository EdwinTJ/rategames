import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className="position-sticky">
        <p>
          © {currentYear} :
          <a
            className="text-white"
            href="https://www.edwinsilvestrewebsite.com/"
          >
            Edwin Silvestre
          </a>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
