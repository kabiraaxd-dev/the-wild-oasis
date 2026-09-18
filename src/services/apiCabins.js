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
    const image = newCabin.image;

    const hasImagePath = typeof image === "string" && image?.startsWith?.(supabaseUrl);
    const hasNewImage = !hasImagePath && !!image && typeof image.name === "string";

    let imagePath = null;
    let imageName = null;

    if (hasImagePath) {
        imagePath = image;
    } else if (hasNewImage) {
        imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    }

    // Editing without a new image -> leave the existing image column untouched
    if (id && !imagePath) {
        delete newCabin.image;
    }

    // create/edit new cabin (supabase query builders are lazy - the chained result must be awaited)
    let query = supabase.from("cabins")

    // create
    if (!id) {
        query = query.insert([{...newCabin, ...(imagePath ? { image: imagePath } : {})}])
    }
    // update
    if (id) {
        query = query.update({...newCabin, ...(imagePath ? { image: imagePath } : {})}).eq("id", id);
    }

    const { data, error } = await query.select("*").single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // already an existing image path, or nothing new to upload
    if (hasImagePath || !hasNewImage) return data;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image);
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