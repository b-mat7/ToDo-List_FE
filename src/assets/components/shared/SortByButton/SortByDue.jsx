import styles from './SortByDue.module.scss'

const SortByDue = ({ sortBy, setSortBy }) => {

  const changeSorting = () => {
    if (sortBy !== "dueDes") {
      setSortBy("dueDes")
    }

    if (sortBy === "dueDes") {
      setSortBy("dueAsc")
    }

    if (sortBy === "dueAsc") {
      setSortBy("")
    }
  }

  return (
    <>
      {sortBy === "dueDes"
        ? <button className={styles.active} onClick={changeSorting}>Fällig(d)</button>
        : sortBy === "dueAsc"
          ? <button className={styles.active} onClick={changeSorting}>Fällig(a)</button>
          : <button onClick={changeSorting}>Fällig</button>
      }
    </>
  );
}

export default SortByDue;