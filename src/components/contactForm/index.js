import React from "react"
import style from "./style.module.scss"
// export default ()=>{

//   function checkValue(e) {
//     console.log(e)
//   }

//   return (
//     <section className={style.contact} id="contact">
//         <form name="contact" method="POST" data-netlify="true">
//           <div className={style.inputWrapper}>
//             <input type="text" name="name"/>
//             <label htmlFor="name">Dein Name</label>
//           </div>
//           <div className={style.inputWrapper}>
//             <input type="email" name="email"/>
//             <label htmlFor="email">Deine eMail</label>
//           </div>
//           <div className={style.inputWrapper}>
//             <textarea name="message"></textarea>
//             <label htmlFor="message">Deine Nachricht</label>
//           </div>
//           <p>
//             <button type="submit">Send</button>
//           </p>
//         </form>
//     </section>
// )
// };

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();

    this.name = React.createRef();
    this.email = React.createRef();
    this.message = React.createRef();
    this.showLength = React.createRef();
    this.change = this.change.bind(this);

    // console.log(this.length)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.name.current.value);
    alert('A email was submitted: ' + this.email.current.value);
    alert('A message was submitted: ' + this.message.current.value);

    // event.preventDefault();
  }

  change(e) {
    if (e.target.value !== "") {
      e.target.className = style.filled
    } else {
      e.target.className = ""
    }
    if(e.target.type === "textarea") {
      // console.log(e.target.value.length)
      this.showLength.current.innerHTML = e.target.value.length + '/1000'
      // this.length.setAttribute("data-content", e.target.value);
      // e.target.className += " " + style.red;
    }
  }

  render() {
    return (
         <section className={style.contact} id="contact">
        <form name="contact" onSubmit={this.handleSubmit} data-netlify="true">
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
            <p className={style.showlength} ref={this.showLength}></p>
          </div>
          <p>
            <button type="submit" ref={this.input}>Abschicken</button>
          </p>
        </form>
    </section>
    );
  }
}

export default ContactForm