import styles from './App.module.css'
import { Header } from './components/Header'
import { Bar } from './components/Bar'

import './global.css'
import { Task } from './components/Task'

function App() {

  return (
    <div>
      <Header />

      <div className={styles.content}>
      <Bar />
        <header>
          <div className={styles.tasksCount}>
            <strong className={styles.created}>Tarefas Criadas</strong>
            <span>5</span>
          </div>

          <div className={styles.tasksCount}>
            <strong className={styles.completed}>Concluídas</strong>
            <span>2 de 5</span>
          </div>
        </header>
        <Task />
      </div>
    </div>
  )
}

export default App
