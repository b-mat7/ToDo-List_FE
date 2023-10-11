import styles from './ControlBar.module.scss'

const ControlBar = () => {
  return (
    <section className={styles.controlbar}>
      <div>
        <input type="text" name="search" id="search" placeholder="Suche" />
      </div>
      <div>
        <p>Filterings</p>
      </div>
    </section>
  );
}

export default ControlBar;