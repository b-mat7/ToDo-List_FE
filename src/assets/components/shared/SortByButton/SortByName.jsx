import SortIcon from '../Icon/SortIcon'
import SortUpIcon from '../Icon/SortUpIcon'
import SortDownIcon from '../Icon/SortDownIcon'
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
        ? <button className={styles.active} onClick={changeSorting}>Name <SortDownIcon /></button>
        : sortBy === "nameAsc"
          ? <button className={styles.active} onClick={changeSorting}>Name <SortUpIcon /></button>
          : <button onClick={changeSorting}>Name <SortIcon /></button>
      }
    </>
  );
}

export default SortByName;