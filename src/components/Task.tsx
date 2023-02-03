import { Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

export function Task() {
  return(
    <div>
      <div className={styles.task}>
        <button className={styles.circle}>
          <Circle size={32} />
        </button>
        <p>Fazer lista 2 e 3 de PLC</p>
        <button className={styles.trash}>
          <Trash size={24}/>
        </button>
      </div>

      <div className={styles.task}>
        <button className={styles.circle}>
          <Circle size={32} />
        </button>
        <p>Definir grupo do projeto de Multimídia</p>
        <button className={styles.trash}>
          <Trash size={24}/>
        </button>
      </div>

      <div className={styles.task}>
        <button className={styles.circle}>
          <Circle size={32} />
        </button>
        <p>Fazer o curso de React da Rocketseat</p>
        <button className={styles.trash}>
          <Trash size={24}/>
        </button>
      </div>

      <div className={styles.task}>
        <button className={styles.circle}>
          <Circle size={32} />
        </button>
        <p>Trabalhar na Quest 4 de Projetão</p>
        <button className={styles.trash}>
          <Trash size={24}/>
        </button>
      </div>

    </div>
  )
}