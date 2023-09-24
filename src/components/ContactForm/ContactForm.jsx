import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './ContactForm.module.css';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '30px',
  opacity: 1,
});

export default class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const isDuplicate = this.props.contacts.some(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );

    if (isDuplicate) {
      Notiflix.Notify.failure(
        `${this.state.name} is already in your contacts.`
      );
      this.setState({
        name: '',
        number: '',
      });
      return;
    }

    this.props.onSubmit({ ...this.state, id: nanoid(5) });
    this.setState({
      name: '',
      number: '',
    });
    Notiflix.Notify.success(`${this.state.name} added to your contacts.`);
  };

  render() {
    return (
      <div>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <input
            className={css.input}
            onChange={this.handleChange}
            id="name"
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label className={css.label} htmlFor="number">
            Number
          </label>
          <input
            className={css.input}
            onChange={this.handleChange}
            id="number"
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={css.addBtn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
