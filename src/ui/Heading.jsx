import  styled, {css}  from "styled-components";

const test=css`
text-align: center;
${10>5 && "background-color: goldenyellow"}`

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 32px;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 28px;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 24px;
    `}
  font-weight: bold;
  margin-bottom: 0.5rem;
  ${test}
`;

export default Heading;
