// Dependencies
import {useState} from 'react'
import {API_URL} from '@/config/index'

// Components

// Style
import styled from 'styled-components'

// Icons

function ImageUpload({evtId, imageUploaded, token}) {
  const [image, setImage] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers:{
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (res.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <FormComponents>
      <h1>Upload Event Image</h1>
      <form action="" onSubmit={handleSubmit}>
        <FileDiv>
          <Upload type="file" onChange={handleFileChange} />
        </FileDiv>
        <Input type="submit" value="Upload" className="btn" />
      </form>
    </FormComponents>
  )
}

export default ImageUpload

const FormComponents = styled.div``;

const FileDiv = styled.div`
  border: 1px #ccc solid;
  background-color: #f4f4f4;
  padding: 10px;
`;

const Input = styled.input.attrs({
  type: "submit",
})`
  width: 100%;
  height: 40px;
  padding: 5px;
  display: block;
  width: 100%;
  margin: 20px 0 30px;
`;

const Upload = styled.input.attrs({
  type:'file'
})`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: 1px #ccc solid;
  background-color: #f4f4f4;
  padding: 10px;
`;