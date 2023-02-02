import styles from './Header.module.css'
import todoLogo from '../assets/rocket.svg' 

export function Header() {
  return(
    <header className={styles.header}>
      <div className={styles.logoAndTitle}>
        <img src={todoLogo} alt="Logo da to-do list" />
        <p>to<span>do</span></p>
      </div>
    </header>
  )
}