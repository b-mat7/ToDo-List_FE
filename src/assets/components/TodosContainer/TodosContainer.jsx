import { useContext, useEffect} from 'react';
import { ToDosContext } from '../../../App';
import ToDoItem from '../ToDoItem/ToDoItem';

import styles from './TodosContainer.module.scss'

const ToDosContainer = () => {

const {toDos, setToDos} = useContext(ToDosContext)

  // 2x mappen
  // Search + Filter effect hier -> evtl <FilterBar/> reinholen..?

  return (
    <section className={styles.toDos_container}>
      <div>Active</div>
      {toDos.map((item, key) => (
        <ToDoItem
          key={key}
          item={item}
        />
      ))}
      <div>Done</div>
    </section>
  );
}

export default ToDosContainer;