import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  ${props => props.type === "horizontal" && css`
    flex-direction: row;
    gap: 1rem;  
  `}
  ${props => props.type === "vertical" && css`
    flex-direction: column;
    gap: 1rem;
  `}
`;

Row.defaultProps = {
  type: "horizontal"
};

export default Row;