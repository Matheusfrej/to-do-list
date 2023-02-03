import styles from './Bar.module.css'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface BarProps {
  onCreateNewTask: (content: string) => void
}

export function Bar({onCreateNewTask}: BarProps) {
  const [newTaskText, setNewTaskText] = useState('')

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault()

    onCreateNewTask(newTaskText)
    setNewTaskText('')
    
  }

  // Atualiza o state do input
  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  // Não deixa dar submit se o input for vazio
  const handleNewTaskInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('A task não pode ter descrição vazia')
  }

  return(
    <div className={styles.addTaskBar}>
      
      <form onSubmit={handleCreateNewTask} className={styles.barAndButton}>
        <input 
          placeholder='Adicione uma nova tarefa'
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button type='submit'>
          <span>Criar</span><PlusCircle size={20} />
          </button>
      </form>
      
    </div>
  )
}