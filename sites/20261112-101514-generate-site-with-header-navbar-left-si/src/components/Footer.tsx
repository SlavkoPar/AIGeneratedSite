export default function Footer() {
  return (
    <footer className='footer'>
      <p>© {new Date().getFullYear()} Fresh Market. All rights reserved.</p>
      <p className='footer-note'>Prices are sample values for demonstration only.</p>
    </footer>
  );
}
