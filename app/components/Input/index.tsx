import styled from "styled-components"
import { FC } from "react"

interface Input {
    handleSubmit: (e: any) => void,
    value: string,
    setValue: (e: any) => void
}

const Input: FC<Input> = ({ handleSubmit, value, setValue }) => {
    return <form onSubmit={handleSubmit}>
        <InputStyle value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" value="add" />
    </form>
}

export default Input

const Button = styled.input`
    width: 50px;
    border-radius: 5px;
    font-size: 20px;
    background-color: #9090de;
`
const InputStyle = styled.input`
    border-radius: 5px;
    height: 27px;

`