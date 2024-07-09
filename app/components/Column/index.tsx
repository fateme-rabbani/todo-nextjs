import styled from "styled-components"
import { FC } from "react"

import Card from "../Card"
import { TasksListProps } from "@/app/[boardNumber]/page"

interface Column extends TasksListProps {
    key: number,
}

const Column: FC<Column> = ({ status, key, tasks, onChange, remove }) => {
    return <Wrapper key={key}>
        <Title>{status}</Title>
        <Card
            tasks={tasks}
            status={status}
            onChange={onChange}
            remove={remove} />
    </Wrapper>
}

export default Column

const Wrapper = styled.div`
    background-color: #9090de;
    padding: 20px;
    border-radius: 5px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const Title = styled.h1`
    color: #fff;
    background-color: #3b3bb1;
    padding: 10px;
    border-radius: 5px;
`