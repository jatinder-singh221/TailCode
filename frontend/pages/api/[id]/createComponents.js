import formidable from "formidable"
import fs from 'fs'
import FormData from 'form-data'
import cookie from 'cookie'

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        const form = new formidable.IncomingForm();
        await form.parse(req, async function (err, fields, files) {
            const formData = new FormData()
            formData.append('name', fields.name)
            formData.append('catagory', fields.catagory)
            formData.append('code', fields.code)

            const file = files.image
            const data = fs.readFileSync(file.filepath)
            formData.append('image', data, file.originalFilename)
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/components/`
            const api = await fetch(location, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${access}`
                },
                body: formData
            }) 
            const apiRes = await api.json()
            return res.status(api.status).end()           
         })
    }
    else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}