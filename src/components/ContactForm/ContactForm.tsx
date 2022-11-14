import React, { useState, useRef, useMemo } from "react";
import * as s from "./ContactForm.module.scss";
import { customAlphabet } from "nanoid";

export default function ContactForm() {
  let formRef = useRef(null);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let checkText = useMemo(
    () => customAlphabet("abcdefghijklmnopqrstuvwxyz", 5)(),
    []
  );
  let [checkTextInput, setCheckTextInput] = useState("");
  let [submitted, setSubmitted] = useState(false);

  /**
   * Send to cf worker
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;

    fetch("/contact", {
      method: "post",
      body: new FormData(formRef.current),
    });
    setSubmitted(true);
    console.log(e);
  }

  return (
    <section className={s.contact} id="contact">
      {!submitted ? (
        <form
          name="contact"
          onSubmit={handleSubmit}
          method="POST"
          action="/contact"
          ref={formRef}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className={s.inputWrapper}>
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
          <div className={s.inputWrapper}>
            <input
              type="email"
              name="email"
              id="form_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="form_email" data-filled={email.length > 0}>
              Email
            </label>
          </div>
          <div className={s.inputWrapper}>
            <textarea
              name="message"
              rows={6}
              id="form_message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <label htmlFor="form_message" data-filled={message.length > 0}>
              Message
            </label>
          </div>

          <div className={s.captchaWrapper}>
            <div>{checkText}</div>
            <div className={s.inputWrapper}>
              <input
                type="text"
                name="checkText"
                id="form_checkText"
                value={checkTextInput}
                autoCapitalize="off"
                autoComplete="off"
                onChange={(e) => {
                  if (e.target.value !== checkText) {
                    // @ts-ignore
                    e.nativeEvent.target.setCustomValidity(
                      "The entered text doesn't match the one to the left"
                    );
                  } else {
                    // @ts-ignore
                    e.nativeEvent.target.setCustomValidity("");
                  }
                  setCheckTextInput(e.target.value);
                }}
                required
              />
              <label
                htmlFor="form_checkText"
                data-filled={checkTextInput.length > 0}
              >
                &lt;- Enter the text to the left
              </label>
            </div>
          </div>

          <div className={`${s.inputWrapper} ${s.submitWrapper}`}>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div className={s.submittedWrapper}>
          <div>
            <img src="/thankyou.webp" alt="Danke!" />
            <p>Thanks! I'll get back to you as soon as I can! :&#41;</p>
          </div>
        </div>
      )}
    </section>
  );
}
