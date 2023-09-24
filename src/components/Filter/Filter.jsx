import React from 'react';
import css from './Filter.module.css';

const Filter = ({ onChange }) => {
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="search">
        Find contacts by name
      </label>
      <input
        className={css.input}
        onChange={onChange}
        type="text"
        name="name"
        label="Search"
        id="search"
      />
    </div>
  );
};

export default Filter;
