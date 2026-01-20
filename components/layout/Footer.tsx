export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-heading-h4 text-white mb-2">ShelterPoint NG</div>
            <p className="text-body-small text-neutral-400">
              Verified Lagos housing platform
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            <a href="/privacy" className="text-body-small text-neutral-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-body-small text-neutral-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="mailto:hello@shelterpointng.com" className="text-body-small text-neutral-400 hover:text-white transition-colors duration-200">
              Contact
            </a>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-body-tiny text-neutral-500">
              © {currentYear} ShelterPoint Nigeria Limited. All rights reserved.
            </p>
            <p className="text-body-tiny text-neutral-500">
              NDPR compliant. Lagos-registered business.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}