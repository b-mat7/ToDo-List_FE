import styles from './TodosContainer.module.scss'

const TodosContainer = () => {
  return (
    <section className={styles.todos_container}>
      <div>Active</div>
      <div>Done</div>
    </section>
  );
}

export default TodosContainer;