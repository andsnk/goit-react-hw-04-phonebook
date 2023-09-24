import React, { useEffect, useRef, useState } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const prevContactsLength = useRef(contacts.length);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      setContacts(JSON.parse(localData));
      Notiflix.Notify.info(`you have ${JSON.parse(localData).length} contacts`);
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (prevContactsLength.current !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      prevContactsLength.current = contacts.length;
    }
  }, [contacts]);

  const formSubmit = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleDelete = id => {
    const deletedContact = contacts.find(contact => contact.id === id);
    if (deletedContact) {
      setContacts(prevContacts =>
        prevContacts.filter(contact => contact.id !== id)
      );
      Notiflix.Notify.info(
        `Contact "${deletedContact.name}" has been deleted.`
      );
    }
  };

  const filteredContacts = () => {
    const normalizedValue = filter.toLowerCase().trim();
    return contacts.filter(contact => {
      return contact.name
        .concat(contact.name)
        .toLowerCase()
        .includes(normalizedValue);
    });
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList contacts={filteredContacts()} deleteContact={handleDelete} />
    </div>
  );
};

export default App;
