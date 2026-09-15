import { supabase } from './supabase'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not get loaded");
    }
    return data;
}

export async function createCabin(newCabin) {
    // const { data, error } = await supabase.from("cabins").insert(cabin);
    const imageName = `${Math.random()}-${newCabin.image.name}`;
    //   "https://fcxdbaopcnwdzsaxlugm.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg";
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins")

    // creating new cabin
    if (!id) {
        query    
        .from("cabins")
        .insert([{...newCabin, image: imagePath}])
    }
    
    const {data, error} = await query.select().single();

    // edit cabin
    if (id) {
        query.update({...newCabin, image: imagePath}).eq("id", id)
    }

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // const avatarFile = event.target.files[0];
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
      if (storageError) {
          // console.error(storageError);
          await supabase.from("cabins").delete().eq("id", data.id);
          console.warn(storageError, "error occuued");
        throw new Error("Cabin image could not be uploaded");
    }

    return data;
}

export async function deleteCabin(id) {
    
const {data, error } = await supabase
  .from("cabins")
  .delete()
  .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;
}