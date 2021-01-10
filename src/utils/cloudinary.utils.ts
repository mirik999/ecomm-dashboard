import axios from "axios";

export async function imageUploadAndGetUrl(
  file: File,
  onEvent: (percent: number, error: string, file: any) => void,
) {
  const NAME = "electroshop-commerce-app";
  const PRESET = "pjegjzge";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${NAME}/upload`;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);

    const payload = await axios.post(CLOUDINARY_URL, formData,{
      onUploadProgress: (event) => {
        const percent = Math.round((100 * event.loaded) / event.total);
        onEvent(percent, '', null);
      }
    });

    onEvent(0, '', payload)
  } catch(err) {
    console.log('onError => ', err)
    onEvent(0, 'Error upload image', null)
  }
}
