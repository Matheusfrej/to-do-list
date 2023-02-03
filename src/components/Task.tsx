import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  id: number,
  checked: boolean,
  content: string,
  onDeleteTask: (id: number) => void
  onCheckTask: (id: number) => void
}
export function Task({id, checked, content, onDeleteTask, onCheckTask}: TaskProps) {
  const handleDeleteTask = () => {
    onDeleteTask(id)
  }
  const handleCheckTask = () => {
    onCheckTask(id)
  }


  return(
    <div>
      {!checked && 
      <div className={styles.task}>
        <button onClick={handleCheckTask} className={styles.circle}>
          <Circle size={24}/>
        </button>
        <p className={styles.normalContent}>{content}</p>
        <button className={styles.trash} onClick={handleDeleteTask}>
          <Trash size={24}/>
        </button>
      </div>}

      {checked && 
      <div className={`${styles.task} ${styles.completedTask}`}>
        <button onClick={handleCheckTask} className={styles.checkCircle}>
          <CheckCircle size={24} weight="fill"/>
        </button>
        <p className={styles.completedContent}>{content}</p>
        <button className={styles.trash} onClick={handleDeleteTask}>
          <Trash size={24}/>
        </button>
      </div>}

    </div>
  )
}