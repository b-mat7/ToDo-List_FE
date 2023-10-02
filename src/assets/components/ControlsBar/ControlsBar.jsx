import styles from './ControlsBar.module.scss'

const ControlsBar = () => {
  return (
    <section className={styles.controls_bar}>
      <div>
        <input type="text" name="search" id="search" placeholder="Suche" />
      </div>
      <div>
        <p>Filterings</p>
      </div>
    </section>
  );
}

export default ControlsBar;