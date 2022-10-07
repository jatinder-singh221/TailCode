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
            formData.append('title', fields.title)
            formData.append('description', fields.description)
            formData.append('status', fields.status)
            formData.append('html', fields.html)
            formData.append('slug', fields.slug)

            const file = files.banner
            const data = fs.readFileSync(file.filepath)
            formData.append('banner', data, file.originalFilename)
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/blog/`
            const api = await fetch(location, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${access}`
                },
                body: formData
            })  
            return res.status(api.status).end()           
        })
    }
    else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}