import React from 'react';
import css from './ContactList.module.css';

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <span className={css.name}>{contact.name}:</span>
          <span className={css.number}>{contact.number}</span>
          <button
            className={css.deleteBtn}
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
