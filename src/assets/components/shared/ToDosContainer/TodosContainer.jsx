import ToDoItem from '../ToDoItem/ToDoItem';
import styles from './ToDosContainer.module.scss'

const ToDosContainer = ({ filteredToDos }) => {

  const activeToDos = filteredToDos.filter(item => item.active === true)
  const inactiveToDos = filteredToDos.filter(item => item.active === false)

  return (
    <section className={styles.toDos_container}>
      <div className={styles.active}>
        {activeToDos.map((item) => (
          <ToDoItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
      <div className={styles.inactive}>
        {inactiveToDos.map((item) => (
          <ToDoItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default ToDosContainer;