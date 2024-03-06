import { useSelector } from 'react-redux'
import {
  deleteTodo,
  checkTodo,
} from '../redux/todoList'
import { showAlert } from '../redux/alert'
import { RootState, useAppDispatch } from '../redux/store'

const List: React.FC = () => {
  const dispatch = useAppDispatch()
  const { todoList, todoFilter } = useSelector((state: RootState) => state.todos)
  const deleteItem = (id: string): void => {
    dispatch(deleteTodo(id))
    dispatch(
      showAlert({
        isVisible: true,
        type: 'danger',
        title: 'Item deleted',
      })
    )
  }

  return (
    <div className={'todo-list'}>
      {todoList
        .filter((todo) => {
          if (todoFilter === 'completed') { return todo.checked }
          else if (todoFilter === 'current') { return !todo.checked }
          return todo
        })
        .map((todo) => {
          return (
            <div
              key={todo.id}
              className={`todo-item ${todo.checked && 'checked'}`}
              onClick={() => dispatch(checkTodo(todo.id))}
            >
              <button
                type='button'
                className='todo-item-check-btn'
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='currentColor'
                    d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'
                  ></path>
                </svg>
              </button>
              <div className='todo-item-title'>
                <div>{todo.title}</div>
              </div>
              <div className='todo-item-buttons'>
                <button
                  type='button'
                  className='todo-item-delete'
                  onClick={() => deleteItem(todo.id)}
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 448 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z'></path>
                  </svg>
                </button>


              </div>
            </div>
          )
        })
        .reverse()}
    </div>
  )
}

export default List