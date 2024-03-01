const cloud_name = "dowftdnex";
const preset_name = "social_media";

export const uploadToCloudinary = async (pics, fileType) => {
  console.log(pics, fileType);
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", preset_name);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "post",
        body:data
      }
    );
    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("error");
  }
};
