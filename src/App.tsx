import styles from './App.module.css'
import { Header } from './components/Header'
import { Bar } from './components/Bar'

import clipboard from './assets/clipboard.svg'

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

  const sortTaskByChecked = (checked: boolean, alteredTasks: TaskType[], index: number) => {
    // fazendo uma maneira de agrupar as tasks não concluídas e as tasks concluídas

    let i = index + 1
    let toContinue = true
    if (checked == true) {
      // se só houverem tasks não completadas
      if (taskCount[1] == 0) {
        [alteredTasks[index], alteredTasks[taskCount[0]-1]] = [alteredTasks[taskCount[0]-1], alteredTasks[index]]
      }
  
      else if (taskCount[0] > taskCount[1] && taskCount[0] > 1 && index < taskCount[0]-1) {
        while (toContinue) {
          // se i passar do último índice do array, para
          if (i == taskCount[0]) {
            toContinue = false
          }
          /* 
          Se o penúltimo elemento foi false e o próximo é true, é para swapar o elemento
          que foi checked com esse elemento que era false, para deixar as tasks
          não concluídas e as concluídas agrupadas
           */
          else if (alteredTasks[i].checked == true && alteredTasks[i-1].checked == false) {
            [alteredTasks[index], alteredTasks[i-1]] = [alteredTasks[i-1], alteredTasks[index]]
            toContinue = false
          }
          i += 1
        }
      }
    }
    else {
      // se todas as tasks forem completadas, coloca a task unchecked no início
      if (taskCount[0] == taskCount[1]) {
        [alteredTasks[index], alteredTasks[0]] = [alteredTasks[0], alteredTasks[index]]
      }
      else if (taskCount[0] > taskCount[1] && taskCount[0] > 1) {
        i = index - 1
        while (toContinue) {
          // se i passar do primeiro índice do array, para
          if (i == -1) {
            toContinue = false
          }
          /* 
          Se o i + 1 for false e o i for true, quer dizer que 
          */
          else if (alteredTasks[i].checked == false && alteredTasks[i+1].checked == true) {
            [alteredTasks[index], alteredTasks[i+1]] = [alteredTasks[i+1], alteredTasks[index]]
            toContinue = false
            console.log(alteredTasks[i].content)
            console.log(alteredTasks[i+1].content)
          }
          i -= 1
        }
      }
    }
    

    return alteredTasks
  }

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

  const checkTask = (id:number) => {
    // cria uma copia da lista de tasks atual
    let alteredTasks = [...tasks]

    // armazeno a task que será alterada
    let editedTask = tasks.find(element => element.id == id)

    // pego o índice do array de onde a task se encontrava
    let index = tasks.indexOf(editedTask!)

    editedTask!.checked = !editedTask!.checked

    // mudo no array copiado para a task atualizada
    alteredTasks[index] = editedTask!

    // atualizando a contagem de tasks completadas
    if (editedTask!.checked == true) {
      setTaskCount([taskCount[0],taskCount[1]+1])
    }
    else {
      setTaskCount([taskCount[0],taskCount[1]-1])
    }

    alteredTasks = [...sortTaskByChecked(editedTask!.checked, alteredTasks, index)]
    
    setTasks(() => {
      return alteredTasks
    });

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
            {(taskCount[0] != 0) && <span>{taskCount[1]} de {taskCount[0]}</span>}
            {(taskCount[0] == 0) && <span>{taskCount[0]}</span>}
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
              onCheckTask={checkTask}
            />
          )
        })}
        {(taskCount[0] == 0) && 
          <div className={styles.emptyTasksScreen}>
            <img src={clipboard} alt="clipboard" />
            <div>
              <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App
