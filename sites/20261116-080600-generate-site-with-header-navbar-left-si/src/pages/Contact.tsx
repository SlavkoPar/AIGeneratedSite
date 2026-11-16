import { useState } from 'react';
import type { FormEvent } from 'react';

const EMAIL = 'hello@example.com';

export default function Contact() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = message + '\n\n' + name;
    window.location.href =
      'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    setOpened(true);
  };

  return (
    <>
      <section className='page-head'>
        <p className='eyebrow'>Contact</p>
        <h1>Tell us about your project.</h1>
        <p className='lead'>
          Fill in the form and your email app will open with the message ready to send. You can also write directly to{' '}
          <a className='inline-link' href={'mailto:' + EMAIL}>{EMAIL}</a>.
        </p>
      </section>

      <form className='form card' onSubmit={onSubmit}>
        <div className='field'>
          <label htmlFor='name'>Your name</label>
          <input id='name' name='name' type='text' autoComplete='name' required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='field'>
          <label htmlFor='subject'>Subject</label>
          <input id='subject' name='subject' type='text' required value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className='field'>
          <label htmlFor='message'>Message</label>
          <textarea id='message' name='message' rows={6} required value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>
          Open in email app
        </button>
        <p className='form-status' role='status'>
          {opened ? 'Your email app should now be open. If nothing happened, please write to ' + EMAIL + '.' : ''}
        </p>
      </form>
    </>
  );
}
