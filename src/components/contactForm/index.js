import React from "react"
import * as style from "./style.module.scss"

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.message = React.createRef();
  }

  change(e) {
    if (e.target.value !== "") {
      e.target.className = style.filled
    } else {
      e.target.className = ""
    }
  }

  render() {
    return (
      <section className={style.contact} id="contact">
        <form name="contact" onSubmit={this.handleSubmit} method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
          <div className={style.inputWrapper}>
            <input type="text" name="name" id="form_name" onChange={this.change} ref={this.name} required/>
            <label htmlFor="form_name">Name</label>
          </div>
          <div className={style.inputWrapper}>
            <input type="email" name="email" id="form_email" onChange={this.change} ref={this.email} required/>
            <label htmlFor="form_email">Email-Adresse</label>
          </div>
          <div className={style.inputWrapper}>
            <textarea name="message" rows="6" id="form_message" onChange={this.change} ref={this.message} required></textarea>
            <label htmlFor="form_message">Nachricht</label>
          </div>
          <div className={style.inputWrapper}>
            <button type="submit" ref={this.input}>Abschicken</button>
          </div>
        </form>
    </section>
    );
  }
}

export default ContactForm