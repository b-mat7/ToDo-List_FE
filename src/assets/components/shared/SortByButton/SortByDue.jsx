import SortIcon from '../Icon/SortIcon'
import SortUpIcon from '../Icon/SortUpIcon'
import SortDownIcon from '../Icon/SortDownIcon'
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
        ? <button className={`${styles.sort_btn} ${styles.active}`} onClick={changeSorting}>Fällig <SortDownIcon /></button>
        : sortBy === "dueAsc"
          ? <button className={`${styles.sort_btn} ${styles.active}`} onClick={changeSorting}>Fällig <SortUpIcon /></button>
          : <button className={styles.sort_btn} onClick={changeSorting}>Fällig <SortIcon /></button>
      }
    </>
  );
}

export default SortByDue;