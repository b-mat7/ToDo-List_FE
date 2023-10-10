import { useContext } from 'react';
import { ToDosContext } from '../../../App';
import ToDoItem from '../ToDoItem/ToDoItem';

import styles from './TodosContainer.module.scss'

const ToDosContainer = () => {

  const { toDos, setToDos } = useContext(ToDosContext)

  const activeToDos = toDos.filter(item => item.active === true)
  const inactiveToDos = toDos.filter(item => item.active === false)

  // Search + Filter effect hier -> evtl <FilterBar/> reinholen..?

  return (
    <section className={styles.toDos_container}>
      <div className={styles.active}>
        {activeToDos.map((item, key) => (
          <ToDoItem
            key={key}
            item={item}
          />
        ))}
      </div>
      <div className={styles.inactive}>
        {inactiveToDos.map((item, key) => (
          <ToDoItem
            key={key}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default ToDosContainer;