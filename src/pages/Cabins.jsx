import { useEffect } from "react";
import Heading from "../ui/Heading.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins.js";
import styled from "styled-components";

const Para = styled.p`
  margin-block: 0.25rem;
`
function Cabins() {
  useEffect(() => {
    getCabins().then(data => console.log(data)).catch(error => console.error(error));
  }, []);
  return (
    <>
    <Row type="vertical" >
      <Heading as="h1">All cabins</Heading>
      <Para >
        List all cabins and perform actions on them.
      </Para>
    </Row>
    <Row >
      <CabinTable />
    </Row>
    </>
  );
}

export default Cabins;
