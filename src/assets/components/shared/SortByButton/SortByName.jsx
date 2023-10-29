import { useState } from 'react';
import styles from './SortByName.module.scss'

const SortByName = ({ sortBy, setSortBy }) => {

  const changeSorting = () => {
    if (sortBy !== "nameAsc") {
      setSortBy("nameAsc")
    }

    if (sortBy === "nameAsc") {
      setSortBy("nameDes")
    }

    if (sortBy === "nameDes") {
      setSortBy("")
    }
  }

  return (
    <>
      {sortBy === "nameAsc"
        ? <button className={styles.active} onClick={changeSorting}>N-Asc</button>
        : sortBy === "nameDes"
          ? <button className={styles.active} onClick={changeSorting}>N-Des</button>
          : <button onClick={changeSorting}>Name</button>
      }
    </>
  );
}

export default SortByName;