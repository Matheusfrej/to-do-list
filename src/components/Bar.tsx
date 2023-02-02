import styles from './Bar.module.css'
import { PlusCircle } from 'phosphor-react'

export function Bar() {
  return(
    <div className={styles.addTaskBar}>
      
      <div className={styles.barAndButton}>
        <input placeholder='Adicione uma nova tarefa'></input>
        <button><span>Criar</span><PlusCircle size={20} /></button>
      </div>
      
    </div>
  )
}