import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'

type FormEle = React.FormEvent<HTMLFormElement>

interface ITodo {
    text: string,
    complete: boolean
}

export default function App(): any {
    const [value, setValue] = useState<string>("")
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (e: FormEle): void => {
        console.log("=========>value", value)
        console.log("=========>event", e)
        e.preventDefault() //stop refreshing the page when changes occured
        addTodo(value)
        setValue('')
    }

    const addTodo = (text: string): void => {
        const newTodos: ITodo[] = [...todos, { text, complete: false }] //its like {text: text, complete: false}
        setTodos(newTodos)
        console.log("todos: ", todos)
    }

    const completeTodo = (index: number): void => {
        const newTodo: ITodo[] = [...todos]
        newTodo[index].complete = !newTodo[index].complete
        setTodos(newTodo)
    }

    const removeTodo = (index: number): void => {
        const newTodo: ITodo[] = [...todos]
        newTodo.splice(index, 1)
        setTodos(newTodo)
    }

    return (
        <Fragment>
            <h1>To do List</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={value} onChange={e => setValue(e.target.value)} required />
                <button type='submit'>Add todo</button>
            </form>
            <section>
                {todos.map((todo: ITodo, index: number) => {
                    return (
                        <Fragment key={index}>
                            <div style={{ textDecoration: todo.complete ? 'line-through' : "" }}>{todo.text}</div>
                            <button type='button' onClick={() => completeTodo(index)}>{todo.complete ? "complete" : "incomplete"}</button>
                            {' '} {/* {' '} adding a space */}
                            <button type='button' onClick={() => removeTodo(index)}>remove</button>
                        </Fragment>
                    )
                })}
            </section>
        </Fragment>
    )
}

// const root = document.getElementById('app-root');

ReactDOM.render(<App />, document.getElementById('root'))
