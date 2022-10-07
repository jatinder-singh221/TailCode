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
    if (req.method === "PUT") {
        const form = new formidable.IncomingForm();
        await form.parse(req, async function (err, fields, files) {
            const formData = new FormData()
            const file = files.userProfileImage
            const data = fs.readFileSync(file.filepath);
            formData.append('userProfileImage', data, file.originalFilename)
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/user/update/profile`
            const api = await fetch(location, {
                method: 'PUT',
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
        res.setHeader('Allow', ['PUT'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}
