const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-4">
            Style<span className="text-secondary">Decor</span>
          </h2>
          <p className="text-sm opacity-80 mb-3">
            Smart Home & Ceremony Decoration Booking System
          </p>
          <p className="text-sm">123 Decoration Avenue, Dhaka, Bangladesh</p>
          <p className="text-sm mt-2">📧 info@styledecor.com</p>
          <p className="text-sm">📞 +880 17XX XXX XXX</p>
        </div>

        
        <div>
          <h6 className="text-lg font-semibold mb-4">Working Hours</h6>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between max-w-xs">
              <span>Monday – Friday</span>
              <span className="font-medium">9:00 AM – 6:00 PM</span>
            </li>
            <li className="flex justify-between max-w-xs">
              <span>Saturday</span>
              <span className="font-medium">10:00 AM – 4:00 PM</span>
            </li>
            <li className="flex justify-between max-w-xs">
              <span>Sunday</span>
              <span className="text-error font-medium">Closed</span>
            </li>
          </ul>
        </div>

       
        <div>
          <h6 className="text-lg font-semibold mb-4">Connect With Us</h6>
          <div className="flex gap-4">
            <a
              className="btn btn-circle btn-outline hover:btn-primary"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              className="btn btn-circle btn-outline hover:btn-info"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.164-2.722-.951.565-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.49 2.138-4.887 5.233-4.1-.21-7.72-2.17-10.155-5.163-.426.732-.66 1.58-.66 2.474 0 1.95.99 3.666 2.484 4.698-.79-.025-1.555-.245-2.203-.603v.06c0 2.235 1.597 4.103 3.73 4.526-.37.1-.76.15-1.16.15-.29 0-.57-.03-.84-.08.59 1.84 2.308 3.18 4.34 3.224-1.655 1.29-3.73 2.06-5.92 2.06-.38 0-.75-.02-1.12-.06 2.15 1.39 4.7 2.2 7.45 2.2 9.05 0 14-7.5 14-13.98v-.57c.96-.695 1.79-1.56 2.45-2.55z" />
              </svg>
            </a>
            <a
              className="btn btn-circle btn-outline hover:btn-secondary"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M12 2c2.75 0 3.125.01 4.25.06l.875.04c.938.04 1.75.188 2.375.438s1.125.625 1.625 1.125.875 1 .75 1.625.188 1.438.438 2.375l.04.875c.05 1.125.06 1.5.06 4.25s-.01 3.125-.06 4.25l-.04.875c-.04.938-.188 1.75-.438 2.375s-.625 1.125-1.125 1.625-1 .875-1.625 1.125-1.438.188-2.375.438l-.875.04c-1.125.05-1.5.06-4.25.06s-3.125-.01-4.25-.06l-.875-.04c-.938-.04-1.75-.188-2.375-.438s-1.125-.625-1.625-1.125-.875-1-.75-1.625-.188-1.438-.438-2.375l-.04-.875c-.05-1.125-.06-1.5-.06-4.25s.01-3.125.06-4.25l.04-.875c.04-.938.188-1.75.438-2.375s.625-1.125 1.125-1.625 1-.875 1.625-1.125 1.438-.188 2.375-.438l.875-.04c1.125-.05 1.5-.06 4.25-.06z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
