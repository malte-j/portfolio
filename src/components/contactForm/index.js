import React from "react"
import style from "./style.module.scss"

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();

    this.name = React.createRef();
    this.email = React.createRef();
    this.message = React.createRef();
  }

  handleSubmit(event) {
    // console.log('A name was submitted: ' + this.name.current.value);
    // console.log('A email was submitted: ' + this.email.current.value);
    // console.log('A message was submitted: ' + this.message.current.value);
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
            <input type="text" name="name"  onChange={this.change} ref={this.name} required/>
            <label htmlFor="name">Name</label>
          </div>
          <div className={style.inputWrapper}>
            <input type="email" name="email" onChange={this.change} ref={this.email} required/>
            <label htmlFor="email">Email-Adresse</label>
          </div>
          <div className={style.inputWrapper}>
            <textarea name="message" rows="6" onChange={this.change} ref={this.message} required></textarea>
            <label htmlFor="message">Nachricht</label>
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