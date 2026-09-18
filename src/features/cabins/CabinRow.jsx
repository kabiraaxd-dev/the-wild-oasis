import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../ui/Button"
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.js";

import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 1.8fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const { id, name, image, maxCapacity, regularPrice, discount } =
  cabin;
  const [showForm, setShowForm] = useState(false);

  const { isDeleting, deleteCabin } = useDeleteCabin()

  /* const queryClient = useQueryClient();

  const {isLoading, mutate} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      })
    },
    onError: (error) => {
      toast.error(error.message);
    }
  }) */

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Up to <strong>{maxCapacity}</strong> people</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{discount}%</Discount> : <div>-</div>}
        <Actions>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setShowForm((show) => !show)}
            disabled={isDeleting}
          >
            Edit <HiOutlinePencil />
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => deleteCabin(id)}
            disabled={isDeleting}
          >
            Delete <HiOutlineTrash />
          </Button>
        </Actions>
      </TableRow>
      {showForm && <CreateCabinForm cabinEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    // description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
