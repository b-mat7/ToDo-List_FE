import styles from './SortByEdited.module.scss'

const SortByEdited = ({ sortBy, setSortBy }) => {

  const changeSorting = () => {
    if (sortBy !== "editedDes") {
      setSortBy("editedDes")
    }

    if (sortBy === "editedDes") {
      setSortBy("editedAsc")
    }

    if (sortBy === "editedAsc") {
      setSortBy("")
    }
  }

  return (
    <>
      {sortBy === "editedDes"
        ? <button className={styles.active} onClick={changeSorting}>Bearbeitet(d)</button>
        : sortBy === "editedAsc"
          ? <button className={styles.active} onClick={changeSorting}>Bearbeitet(a)</button>
          : <button onClick={changeSorting}>Edited</button>
      }
    </>
  );
}

export default SortByEdited;