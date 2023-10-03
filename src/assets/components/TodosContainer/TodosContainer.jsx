import { useContext, useEffect } from 'react';
import { ToDosContext } from '../../../App';
import ToDoItem from '../ToDoItem/ToDoItem';

import styles from './TodosContainer.module.scss'

const ToDosContainer = () => {

  const { toDos, setToDos } = useContext(ToDosContext)

  const activeToDos = toDos.filter(item => item.status === 'aktiv')
  const inactiveToDos = toDos.filter(item => item.status === 'inaktiv')

  // Search + Filter effect hier -> evtl <FilterBar/> reinholen..?

  return (
    <section className={styles.toDos_container}>
      <div>Active</div>
      {activeToDos.map((item, key) => (
        <ToDoItem
          key={key}
          item={item}
        />
      ))}
      <div>Done</div>
      {inactiveToDos.map((item, key) => (
        <ToDoItem
          key={key}
          item={item}
        />
      ))}
    </section>
  );
}

export default ToDosContainer;