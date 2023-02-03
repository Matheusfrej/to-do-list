import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  id: number,
  checked: boolean,
  content: string,
  onDeleteTask: (taskId: number) => void
}
export function Task({id, checked, content, onDeleteTask}: TaskProps) {
  const handleDeleteTask = () => {
    onDeleteTask(id)
  }

  return(
    <div>
      {!checked && 
      <div className={styles.task}>
        <button className={styles.circle}>
          <Circle size={24}/>
        </button>
        <p className={styles.normalContent}>{content}</p>
        <button className={styles.trash} onClick={handleDeleteTask}>
          <Trash size={24}/>
        </button>
      </div>}

      {checked && 
      <div className={`${styles.task} ${styles.completedTask}`}>
        <button className={styles.checkCircle}>
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