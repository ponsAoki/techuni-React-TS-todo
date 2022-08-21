import type { NextPage } from 'next'
import { Button, Checkbox, TextInput } from '@mantine/core';
// import {TextInput} from '@mantine/core'
import { ChangeEvent, useState } from 'react';



const Home: NextPage = () => {
  const [todoText, setTodoText] = useState<string>("")
  const [inCompleteTodos, setInCompleteTodos] = useState<string[]>([])
  const [completeTodos, setCompleteTodos] = useState<string[]>([])

  const changeTodo = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoText(e.target.value)
  }

  const addTodo = () => {
    setInCompleteTodos([...inCompleteTodos, todoText])
    setTodoText("")
  }

  const completeTodo = (index: number) => {
    //完了したtodoを追加
    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]]
    setCompleteTodos(newCompleteTodos)

    //未完了のtodoから削除する
    const newIncompleteTodos = inCompleteTodos.filter((_, i) => i !== index)
    setInCompleteTodos(newIncompleteTodos)
  }

  const deleteTodo = (index: number) => {
    //完了したtodoから削除
    const newCompleteTodos = completeTodos.filter((_, i) => i !== index)
    setCompleteTodos(newCompleteTodos)

    //未完了のtodoを追加
    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]]
    setInCompleteTodos(newIncompleteTodos)
  }

  return (
    <div>
      <div className='flex justify-center items-center mt-16 gap-10'>

        <TextInput placeholder='todoを追加' classNames={{
            input: "bg-[#F5F5F5]",
            wrapper: "w-[356px] text-[#AAAAAA]",
          }} value={todoText} onChange={changeTodo}></TextInput>
        <Button className='text-xl font-bold' onClick={addTodo} disabled={todoText.length < 0}>Todoを追加</Button>
      </div>
      <div className='pl-56'>
        <div className='text-xl mt-10 mb-7'>📝 未完了</div>
        <ul className='pl-3'>
              {inCompleteTodos.map((inCompleteTodo, index) => {
                return (
                  <li className='mb-6' key={index}>
                    <Checkbox label={inCompleteTodo} onClick={() => completeTodo(index)}  />
                  </li>
                  
                )
              })}
        </ul>
      </div>
      <div className='pl-56'>
        <div className='text-xl mt-10 mb-7'>✅ 完了</div>
          <ul className='pl-3'>
            {completeTodos.map((completeTodo, index) => {
              return (
          <li className='mb-6' key={index}>
                  <Checkbox label={completeTodo} checked={true} onClick={() => {deleteTodo(index)}} />
          </li>

              )
            })}
        </ul>
      </div>
    </div>
  )

}

export default Home
