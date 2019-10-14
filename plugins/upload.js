import * as axios from 'axios'

const BASE_URL = 'http://localhost:80'

function upload (formData) {
  const url = `${BASE_URL}/api/image/upload`
  return axios({
    method: 'post',
    url,
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
}

export { upload }
