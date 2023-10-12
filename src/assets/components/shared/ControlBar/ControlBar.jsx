import { useContext, useEffect, useState } from 'react';
import { RefreshContext } from '../../pages/Home/Home';

import ToDosContainer from '../ToDosContainer/TodosContainer';

import styles from './ControlBar.module.scss'

const ControlBar = ({ toDos }) => {
  const [filteredToDos, setFilteredToDos] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  const { refresh, setRefresh } = useContext(RefreshContext)

  useEffect(() => {
    setFilteredToDos(toDos)
  }, [toDos])


  const filterByType = () => {
    if (isFiltered) {
      setFilteredToDos(toDos)
      setIsFiltered(prev => !prev)
    } else {
      const filteredToDos = [...toDos].filter(item => item.type === "todo")
      setFilteredToDos(filteredToDos)
      setIsFiltered(prev => !prev)
    }
  }

  return (
    <section className={styles.controlbar}>
      <div>
        <input type="text" name="search" id="search" placeholder="Suche" />
      </div>
      <div>
        <button onClick={filterByType}>Type</button>
      </div>
      <ToDosContainer filteredToDos={filteredToDos} />
    </section>
  );
}

export default ControlBar;