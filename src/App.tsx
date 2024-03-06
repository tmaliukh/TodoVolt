import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { removeAll, addTodo, filterChecked } from './redux/todoList'
import { showAlert } from './redux/alert'
import List from './Components/List'
import Alert from './Components/Alert'
import { RootState, useAppDispatch } from './redux/store'

const MIN_TODO_TEXT = 5

const App: React.FC = () => {
  const [todo, setTodo] = useState('')

  const dispatch = useAppDispatch()
  const todoList = useSelector((state: RootState) => state.todos.todoList)
  const alert = useSelector((state: RootState) => state.alerts)
  const getChecked = (): number => todoList.reduce((acc, todo) => todo.checked ? acc + 1 : acc, 0)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!todo) {
      dispatch(
        showAlert({
          type: 'danger',
          title: 'Please enter a value',
        })
      )
    } else if (todo.length < MIN_TODO_TEXT) {
      dispatch(
        showAlert({
          type: 'danger',
          title: 'Todo length should be more than 5 letters',
        })
      )
    } else {
      dispatch(addTodo(todo))
      dispatch(
        showAlert({
          type: 'success',
          title: 'Item added to the list',
        })
      )
      setTodo('')
    }
  }

  const removeItems = (): void => {
    dispatch(removeAll())
    dispatch(
      showAlert({
        type: 'danger',
        title: 'All Items removed',
      })
    )
  }

  const handleSelect = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as HTMLTextAreaElement
    switch (target.value) {
      case 'all':
        dispatch(filterChecked('all'))
        break
      case 'current':
        dispatch(filterChecked('current'))
        break
      case 'completed':
        dispatch(filterChecked('completed'))
        break

      default:
        break
    }
  }

  return (
    <div className='app'>
      <div className='content'>
        <section className='todo-wrapper'>
          {alert.isVisible && <Alert />}
          <div className='todo-container'>
            <h1 className='todo-title'>Todo List</h1>
            <div className='todo-top'>
              <div>
                <form onChange={e => handleSelect(e)}>
                  <select name="select" id='sel'>
                    <option value="all">All todos</option>
                    <option value="completed">Completed</option>
                    <option value="current">Current</option>
                  </select>
                </form>
              </div>
              <div>
                <div className='todo-count'>
                  All todos
                  <div className='todo-count-value'>{todoList.length}</div>
                </div>
                <div className='todo-count'>
                  Completed
                  <div className='todo-count-value'>{getChecked()}</div>
                </div>
                <div className='todo-count'>Uncompleted
                  <div className='todo-count-value'>{todoList.length - getChecked()}</div>
                </div>
              </div>
            </div>
            <form className='todo-form' onSubmit={handleSubmit}>
              <div className='todo-form-input'>
                <input
                  type='text'
                  value={todo}
                  placeholder='enter todo'
                  onChange={(e) => setTodo(e.target.value)}
                />
              </div>
              <button>Add</button>
            </form>
            <List />
            {todoList.length > 1 &&
              <div className='todo-button-group'>
                <button
                  type='button'
                  className='remove-btn'
                  onClick={removeItems}
                >
                  Remove all
                </button>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default App