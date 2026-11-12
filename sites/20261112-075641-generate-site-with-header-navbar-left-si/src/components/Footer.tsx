export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p>&copy; {year} Fresh Market. All rights reserved.</p>
      <p className='footer-note'>Prices shown are dummy values for demonstration purposes only.</p>
    </footer>
  );
}
