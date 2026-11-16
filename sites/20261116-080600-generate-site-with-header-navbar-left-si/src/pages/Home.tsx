import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

interface Feature {
  title: string;
  text: string;
}

const features: Feature[] = [
  { title: 'Clear structure', text: 'A header, a side navigation and a footer that stay out of the way and keep every page easy to find.' },
  { title: 'Works everywhere', text: 'The layout adapts from wide desktop screens down to small phones, where the navigation becomes a drawer.' },
  { title: 'Built for everyone', text: 'Keyboard friendly, readable contrast, and respectful of reduced motion and dark mode preferences.' },
];

export default function Home() {
  return (
    <>
      <section className='hero'>
        <p className='eyebrow'>Design and development studio</p>
        <h1>Calm, considered websites for small teams.</h1>
        <p className='lead'>
          Meridian helps organisations explain what they do, simply and clearly. We plan, design and build sites that
          are fast to load and easy to maintain.
        </p>
        <div className='actions'>
          <Link to='/services' className='btn btn-primary'>
            See our services <Icon name='arrow' size={18} />
          </Link>
          <Link to='/about' className='btn btn-ghost'>
            About the studio
          </Link>
        </div>
      </section>

      <section aria-labelledby='features-title'>
        <h2 id='features-title'>What you get</h2>
        <ul className='card-grid'>
          {features.map((f, i) => (
            <li className='card' key={f.title}>
              <span className='card-num' aria-hidden='true'>0{i + 1}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='banner'>
        <div>
          <h2>Ready when you are</h2>
          <p>Share a few lines about your project and we will suggest a sensible next step.</p>
        </div>
        <Link to='/contact' className='btn btn-primary'>
          Contact us
        </Link>
      </section>
    </>
  );
}
