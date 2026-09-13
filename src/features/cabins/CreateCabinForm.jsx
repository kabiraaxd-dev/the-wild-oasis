import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
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

function CreateCabinForm() {
  const {register, handleSubmit, reset} = useForm();

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
      mutationFn: createCabin,
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

  function onSubmit(data) {
    console.log(data);
    mutate(data)
    /* createCabin(data).then(response => {
      console.log(response)
      toast.success("Cabin created successfully");
    }).catch(error => toast.error(error)); */
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
        <Error>Required</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required" })} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice", { required: "This field is required" })} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", { required: "This field is required" })} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="text" id="description" {...register("description")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant="secondary" type="reset">
          Cancel
        </Button>
        {/* <Button variant="primary">Edit cabin</Button> */}
        <Button variant="primary" type="submit" disabled={isLoading}>
          Create cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
