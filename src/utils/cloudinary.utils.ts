export async function imageUploadAndGetUrl(
  base64: string,
  format: string,
) {
  const NAME = "electroshop-commerce-app";
  const PRESET = "pjegjzge";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${NAME}/upload`;
  const BASE64 = `data:image/${format};base64,${base64}`;

  let data = {
    "file": BASE64,
    "upload_preset": PRESET,
  }

  try {
    const payload = await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(res => res.json())
    return payload.secure_url;
  } catch(err) {
    console.log('err upload image to cloudinary', err)
  }
}
