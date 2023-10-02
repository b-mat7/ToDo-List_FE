import styles from './TopBar.module.scss'

const TopBar = () => {
  return (
    <section className={styles.topbar}>
      <div>
        <input type="text" name="search" id="search" placeholder='Suche'/>
      </div>
    </section>
  );
}

export default TopBar;