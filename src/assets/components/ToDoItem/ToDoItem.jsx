import styles from './ToDoItem.module.scss'

const ToDoItem = ({ item }) => {
  return (
    <article className={styles.todo_item}>
      <div>
        <p>{item.name}</p>
        <p>{item.menge}</p>
      </div>
      <div>
        <p>{item.typ}</p>
        <p>{item.ort}</p>
      </div>
      <div>
        <p>{item.info}</p>
      </div>

      {/* edit button */}
      {/* item.status= inaktive -> zeige delete button */}
      
    </article>
  );
}

export default ToDoItem;