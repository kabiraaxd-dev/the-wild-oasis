import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins.js";
// import Row from "../../ui/Row.jsx";
import CabinRow from "./CabinRow.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 1.8fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, isError, error, isSuccess, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";
  console.log("CabinTable: discountFilter =", discountFilter);
  const filteredData = data?.filter((cabin) => {
    if (discountFilter === "with-discount") {
      return cabin.discount > 0;
    } 
    if (discountFilter === "no-discount") {
      return cabin.discount === 0;
    }
    return true; // Show all cabins if no filter is applied
  });

  return (
    <div>
      <Table/>
      <TableHeader>
        <div>Image</div>
        <div>Name</div>
        {/* <div>Description</div> */}
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </TableHeader>
      {isLoading && <Spinner/>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <div>
          {filteredData.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CabinTable;