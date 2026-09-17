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

export async function createUpdateCabin(newCabin, id) {
    
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

    //   "https://fcxdbaopcnwdzsaxlugm.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg";
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // create/edit new cabin (supabase query builders are lazy - the chained result must be awaited)
    let query = supabase.from("cabins")

    // create
    if (!id) {
        query = query.insert([{...newCabin, image: imagePath}])
    }
    // update
    if (id) {
        query = query.update({...newCabin, image: imagePath}).eq("id", id);
    }

    const { data, error } = await query.select("*").single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // already an existing image path -> nothing new to upload
    if (hasImagePath) return data;

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