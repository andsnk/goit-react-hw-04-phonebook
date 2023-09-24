import React, { Component } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
      Notiflix.Notify.info(`you have ${JSON.parse(localData).length} contacts`);
    } else {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmit = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  handleDelete = id => {
    const deletedContact = this.state.contacts.find(
      contact => contact.id === id
    );
    if (deletedContact) {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
      Notiflix.Notify.info(
        `Contact "${deletedContact.name}" has been deleted.`
      );
    }
  };

  filteredContacts = () => {
    const normalizedValue = this.state.filter.toLowerCase().trim();
    return this.state.contacts.filter(contact => {
      return contact.name
        .concat(contact.name)
        .toLowerCase()
        .includes(normalizedValue);
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmit}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={this.filteredContacts()}
          deleteContact={this.handleDelete}
        />
      </div>
    );
  }
}
