import { useState } from 'react';
import { SITE } from '../site.js';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

/**
 * Catering request form. With VITE_FORM_ENDPOINT set (Formspree, Basin…) it posts there;
 * without it, it just shows the thank-you state, so the template demos cleanly.
 */
export default function CateringForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    if (!ENDPOINT) { setStatus('sent'); return; }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="disp">Got it!</span>
        <p>Thanks. We'll check the calendar and get back to you with a quote within {SITE.replyTime}.</p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label className="field">Your name<input type="text" name="name" autoComplete="name" required /></label>
      <label className="field">Email<input type="email" name="email" autoComplete="email" required /></label>
      <label className="field">Phone<input type="tel" name="phone" autoComplete="tel" /></label>
      <label className="field">Event date<input type="date" name="date" required /></label>
      <label className="field">Kind of event
        <select name="type">
          <option>Birthday or party</option><option>Office lunch</option><option>Wedding</option>
          <option>Block party or festival</option><option>Something else</option>
        </select>
      </label>
      <label className="field">How many people?
        <select name="guests">
          <option>Under 50</option><option>50–100</option><option>100–200</option><option>200+</option>
        </select>
      </label>
      <label className="field full">Where's the party?<input type="text" name="location" placeholder="Address or venue" /></label>
      <label className="field full">Anything else?<textarea name="notes" rows={4} placeholder="Times, menu ideas, parking notes" /></label>
      <div className="full form-foot">
        <button type="submit" className="btn btn-red" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send my request'}</button>
        <span>{status === 'error' ? `That didn't send. Email us at ${SITE.email}.` : `We'll reply within ${SITE.replyTime}.`}</span>
      </div>
    </form>
  );
}
