import axios from 'axios'


export const imageUpload = async image => {

if(image === null){
  return null;
}

  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=2f30cebe273cafa2574e132dd5eaedb7`,
    formData
  )
  return data.data.display_url
}