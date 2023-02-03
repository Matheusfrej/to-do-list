import styles from './App.module.css'
import { Header } from './components/Header'
import { Bar } from './components/Bar'

import './global.css'
import { Task } from './components/Task'
import { useState } from 'react'

function App() {
  const [taskCount, setTaskCount] = useState([3,1])
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: false,
      content: 'Fazer lista 2 e 3 de PLC'
    },
    {
      id: 2,
      checked: false,
      content: 'Definir grupo do projeto de Multimídia'
    },
    {
      id: 3,
      checked: true,
      content: 'Trabalhar na Quest 4 de Projetão'
    },
  ])

  const deleteTask = (taskToDeleteId: number) => {
    // A função filter mantém na lista aqueles em que a comparação dá true e remove os que dá false
    let taskToDelete = tasks.find(element => element.id == taskToDeleteId)

    // altera o estado do contador de tasks dependendo se ela era uma task completa ou não
    if (taskToDelete?.checked == true) {
      setTaskCount([taskCount[0]-1,taskCount[1]-1])
    }
    else {
      setTaskCount([taskCount[0]-1,taskCount[1]])
    }

    // retorna um array com todas as tasks menos a excluída
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id != taskToDeleteId
    })

    // atualiza o estado de tasks
    setTasks(() => {
      return tasksWithoutDeletedOne
    });
    
    
    }

  return (
    <div>
      <Header />

      <div className={styles.content}>
      <Bar />
        <header>
          <div className={styles.tasksCount}>
            <strong className={styles.created}>Tarefas Criadas</strong>
            <span>{taskCount[0]}</span>
          </div>

          <div className={styles.tasksCount}>
            <strong className={styles.completed}>Concluídas</strong>
            <span>{taskCount[1]} de {taskCount[0]}</span>
          </div>
        </header>
        {tasks.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              checked={task.checked}
              content={task.content}
              onDeleteTask={deleteTask}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
