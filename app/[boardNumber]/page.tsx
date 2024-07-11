"use client"
import styled from "styled-components";
import { useState } from "react";

import Input from "../components/Input";
import Column from "../components/Column";

export type Status = "todo" | "doing" | "done"
export interface Task {
    id: number,
    des: string,
    status: Status
}

export interface TasksListProps {
    tasks: Task[],
    status: Status,
    onChange: (id: number, status: Status) => void,
    remove: (id: number) => void
}

let _id = 0
const makeId = () => ++_id

type ParamsType = {
    params: { boardNumber: string }

}

const Board = (props: ParamsType) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: makeId(), des: "first", status: "todo" },
        { id: makeId(), des: "second", status: "doing" },
        { id: makeId(), des: "third", status: "done" }]
    )
    const [taskInp, setTaskInp] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setTasks([...tasks, { id: makeId(), des: taskInp, status: "todo" }])
        setTaskInp("")
    }
    const handleChange = (id: any, status: Status) => {
        setTasks(tasks.map(task => {
            if (task.id !== id) return task
            return { ...task, status }
        }))

    }
    const handleRemove = (id: any) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    return (
        <Wrapper>
            <Title>board {props.params.boardNumber}</Title>
            <Input handleSubmit={handleSubmit} value={taskInp} setValue={setTaskInp} />
            {(["todo", "doing", "done"] as Status[]).map((status, i) => <Column
                status={status}
                key={i}
                tasks={tasks}
                onChange={handleChange}
                remove={handleRemove}
            />)}
        </Wrapper>
    );
}

export default Board

const Wrapper = styled.div`
    background-color: #ccc;
    height: 100%;
    width: 100%;
    display: flex;
    gap: 20px;
    padding: 20px;
`

const Title = styled.h1`
    color:#3b3bb1;
`