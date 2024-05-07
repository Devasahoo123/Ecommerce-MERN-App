import {v4 as uuid} from 'uuid';

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
const uploadImage = async(image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("public_id", uuid());
    formData.append("upload_preset","mern_product")
    const dataresponse = await fetch(url,{
        method: "POST",
        body: formData
    });
    return dataresponse.json();
}
export default uploadImage;