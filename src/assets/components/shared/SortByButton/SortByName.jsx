import styles from './SortByName.module.scss'

const SortByName = ({ sortBy, setSortBy }) => {

  const changeSorting = () => {
    if (sortBy !== "nameDes") {
      setSortBy("nameDes")
    }

    if (sortBy === "nameDes") {
      setSortBy("nameAsc")
    }

    if (sortBy === "nameAsc") {
      setSortBy("")
    }
  }

  return (
    <>
      {sortBy === "nameDes"
        ? <button className={styles.active} onClick={changeSorting}>Name(d)</button>
        : sortBy === "nameAsc"
          ? <button className={styles.active} onClick={changeSorting}>Name(a)</button>
          : <button onClick={changeSorting}>Name</button>
      }
    </>
  );
}

export default SortByName;