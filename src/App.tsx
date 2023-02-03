import styles from './App.module.css'
import { Header } from './components/Header'
import { Bar } from './components/Bar'

import './global.css'
import { Task } from './components/Task'
import { useState } from 'react'


interface TaskType {
  id: number,
  checked: boolean,
  content: string
}

function App() {
  // taskCount contém um par em que o primeiro elemento é o número total
  // de tasks e o segundo elemento é o número de tasks completadas
  const [taskCount, setTaskCount] = useState([3,1])

  // tasks é um array que contém objetos do tipo task
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

  const createNewTask = (content: string) => {
    let highestId = -1
    tasks.forEach(task => {
      if (task.id > highestId) {
        highestId = task.id
      }
    })

    // se a lista de tasks estiver vazia, cria uma task com id = 1
    let newTask: TaskType = {
      id: 1,
      checked: false,
      content: content
    }

    // se não, a task vai ter o maior id existente + 1
    if (taskCount[0] > 0) {
      newTask = {
        id: highestId+1,
        checked: false,
        content: content
      }
    }

    // Coloca a nova task no começo do array
    setTasks(() => {
      return [newTask, ...tasks]
    });
    
    // Aumenta 1 na contagem de tasks totais
    setTaskCount([taskCount[0]+1,taskCount[1]])
  }

  return (
    <div>
      <Header />

      <div className={styles.content}>
      <Bar onCreateNewTask={createNewTask}/>
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
