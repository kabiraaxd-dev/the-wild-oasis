// import { useState } from 'react'
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js" ;
import Heading from "./ui/Heading";
import Button from "./ui/Button";


const Input = styled.input`
font-size: 1.125rem;
border: 1px solid purple;
color: purple;
padding: 0.5rem 0.5rem;
border-radius: 0.5rem;
`

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <GlobalStyles />
      <Heading as="h1">Styled Heading component</Heading>
      <div>
        <Heading as="h2">new react application</Heading>
        <br />
        <Heading as="h3">Fill in the form</Heading>
        <Input type="number" placeholder="no. of guests" />
        <Input type="datetime" placeholder="date" />
        <Button>Check in</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </>
  );
}

export default App
