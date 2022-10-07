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
    if (req.method === "PATCH") {
        const { slug } = req.query
        const form = new formidable.IncomingForm();
        await form.parse(req, async function (err, fields, files) {
            const formData = new FormData()
            formData.append('title', fields.title)
            formData.append('description', fields.description)
            formData.append('status', fields.status)
            formData.append('html', fields.html)
            formData.append('slug', fields.slug)
            const file = files.banner ?? false
            if (file) {
                const data = fs.readFileSync(file.filepath)
                formData.append('banner', data, file.originalFilename)
            }
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/blog/${slug}/`
            const api = await fetch(location, {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${access}`
                },
                body: formData
            })
            return res.status(api.status).end()
        })
    }
    else if (req.method === 'DELETE'){
        try {
            const { slug } = req.query
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/blog/${slug}/`
            const api = await fetch(location, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${access}`
                },
            })
            return res.status(api.status).end()
        } catch (error) {
            res.status(500).end()
        }
    }
    else {
        res.setHeader('Allow', ['PATCH', 'DELETE'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}