interface Value {
  title: string;
  text: string;
}

const values: Value[] = [
  { title: 'Plain language', text: 'We write and design so that visitors understand a page on the first read.' },
  { title: 'Small footprint', text: 'Fewer dependencies and lighter pages mean faster sites and less to maintain.' },
  { title: 'Honest scope', text: 'We agree on what matters most, build that well, and say so when something can wait.' },
];

export default function About() {
  return (
    <>
      <section className='page-head'>
        <p className='eyebrow'>About</p>
        <h1>A small studio with a simple approach.</h1>
        <p className='lead'>
          Meridian is a compact team of designers and developers. We prefer long-term relationships, tidy code and
          interfaces that feel obvious to use.
        </p>
      </section>

      <section aria-labelledby='values-title'>
        <h2 id='values-title'>What guides our work</h2>
        <ul className='card-grid'>
          {values.map((v) => (
            <li className='card' key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby='process-title'>
        <h2 id='process-title'>How a project runs</h2>
        <ol className='steps'>
          <li><strong>Listen.</strong> We learn about your audience, goals and constraints.</li>
          <li><strong>Shape.</strong> We outline the structure and content before any visuals.</li>
          <li><strong>Build.</strong> We design and develop in short, reviewable stages.</li>
          <li><strong>Hand over.</strong> You receive a site you can update with confidence.</li>
        </ol>
      </section>
    </>
  );
}
