import React, { useState, useRef } from "react";
import * as style from "./style.module.scss";

export default () => {
  let formRef = useRef(null)
  
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

  let [submitted, setSubmitted] = useState(false);

  /**
   * Send to cf worker
   * @param {React.FormEvent<HTMLFormElement>} e 
   */
  function handleSubmit(e) {
    e.preventDefault();
    if(!formRef.current) return;

    fetch("/contact", {
      method:'post',
      body: new FormData(formRef.current)
    })
    setSubmitted(true);
    console.log(e);
  }

  return (
    <section className={style.contact} id="contact">
      <form
        name="contact"
        onSubmit={handleSubmit}
        method="POST"
        action="/contact"
        ref={formRef}
      >
        <div data-visible={submitted} className={style.submittedWrapper}>
          <div>
            <img src="/thankyou.webp" alt="Danke!"/>
            <p>Danke! Ich schreibe dir so schnell ich kann :&#41;</p>
          </div>
        </div>

        <input type="hidden" name="form-name" value="contact" />
        <div className={style.inputWrapper}>
          <input
            type="text"
            name="name"
            id="form_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="form_name" data-filled={name.length > 0}>
            Name
          </label>
        </div>
        <div className={style.inputWrapper}>
          <input
            type="email"
            name="email"
            id="form_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="form_email" data-filled={email.length > 0}>
            Email-Adresse
          </label>
        </div>
        <div className={style.inputWrapper}>
          <textarea
            name="message"
            rows="6"
            id="form_message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <label htmlFor="form_message" data-filled={message.length > 0}>
            Nachricht
          </label>
        </div>
        <div className={style.inputWrapper}>
          <button type="submit">Abschicken</button>
        </div>
      </form>
    </section>
  );
};
