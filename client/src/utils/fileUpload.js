export const checkImage = (file) => {
    let err = "";
    if (!file) return err="This file does not exist";

    if (file.size > 1024 * 1024) return err = "The largest image size is 1mb.";

    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg")
        return err = "Image format is incorrect";
}

export const imageUpload = (imgages) => {

}