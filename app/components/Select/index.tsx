import styled from "styled-components"
import { FC } from "react"

import { Status } from "@/app/[boardNumber]/page"
interface Select {
    status: Status
    id: number
    onChange: (id: number, status: Status) => void,
    remove: (id: number) => void
}

const Select: FC<Select> = ({ status, id, onChange, remove }) => {

    const handleChange = (id: number, e: any) => {
        const value = e.target.value

        if (value === "remove")
            remove(id)
        else
            onChange(id, value)
    }
    return <Wrapper value={status} onChange={(e: any) => handleChange(id, e)}>
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
        <option value="remove">remove</option>
    </Wrapper>
}

export default Select

const Wrapper = styled.select`
    background-color: #3b3bb1;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
`