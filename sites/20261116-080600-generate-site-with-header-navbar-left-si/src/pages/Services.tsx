interface Service {
  title: string;
  text: string;
  points: string[];
}

const services: Service[] = [
  {
    title: 'Website design',
    text: 'Layouts, typography and colour that suit your organisation and read well on any screen.',
    points: ['Page structure and wireframes', 'Visual design system', 'Responsive layouts'],
  },
  {
    title: 'Front-end development',
    text: 'Clean, typed, component-based code that is quick to load and straightforward to extend.',
    points: ['React and TypeScript', 'Accessible components', 'Performance tuning'],
  },
  {
    title: 'Content and structure',
    text: 'Help deciding what to say, where it lives, and how people will move through the site.',
    points: ['Navigation planning', 'Copy editing', 'Content audits'],
  },
  {
    title: 'Care and maintenance',
    text: 'Ongoing support so your site stays current, secure and pleasant to use.',
    points: ['Updates and fixes', 'Accessibility reviews', 'Small improvements'],
  },
];

export default function Services() {
  return (
    <>
      <section className='page-head'>
        <p className='eyebrow'>Services</p>
        <h1>Everything a good website needs, nothing it does not.</h1>
        <p className='lead'>Pick a single service or combine them into one project from first sketch to launch.</p>
      </section>

      <ul className='card-grid card-grid-two'>
        {services.map((s) => (
          <li className='card' key={s.title}>
            <h2 className='card-title'>{s.title}</h2>
            <p>{s.text}</p>
            <ul className='ticks'>
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
