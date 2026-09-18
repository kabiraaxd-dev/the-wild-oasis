import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinEdit }) {
  const {id: editId, ...editValues } = cabinEdit || {};
  const isEditing = Boolean(editId);
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditing ? editValues : {}
  });

    const queryClient = useQueryClient();

      const { isLoading, mutate: createCabin } = useMutation({
        mutationFn: createUpdateCabin,
        onSuccess: () => {
          toast.success("Cabin created successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
        mutationFn: ({newCabinData, id}) => createUpdateCabin(newCabinData, id),
        onSuccess: () => {
          toast.success("Cabin updated successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

  function onSubmit(data) {
    let image = data.image;

    // For an untouched FileInput, react-hook-form returns a FileList (or
    // null/undefined), not the stored image URL. In that case we must keep the
    // cabin's existing image instead of overwriting it with an empty value.
    if (typeof image !== "string") {
      image = image?.[0];

      // No new file was selected -> keep the current image
      if (!image && isEditing) image = editValues.image;
    }

    if (isEditing) {
      updateCabin({ newCabinData: {...data, image}, id: editId });
    } else {
      createCabin({...data, image});
    }
  }
  function onSubmitError(errors) {
    console.log("submit errors", errors);
  }

  const {errors} = formState;
  // console.log(errors);
  
  return (
    <Form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Value must be at least 1" },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 0, message: "Value must be at least 0" },
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            deps: ["regularPrice"],
            validate: (value) =>
              value < Number(getValues("regularPrice")) ||
              "Value must be less than regular price",
          })}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for cabin</Label>
        <Textarea type="text" id="description" {...register("description")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant="secondary" type="reset">
          Cancel
        </Button>

        <Button variant="primary" type="submit" disabled={isLoading || isUpdating}>
          {isEditing ? "Edit" : "Create"} cabin {isUpdating && "..."}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
};

export default CreateCabinForm;
