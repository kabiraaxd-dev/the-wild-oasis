import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast"

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    
    const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            // reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return {isUpdating, updateCabin}    
}