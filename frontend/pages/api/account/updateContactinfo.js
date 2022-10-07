import cookie from 'cookie'
import { Header } from "@/provider/provider.Headers"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const body = JSON.stringify(req.body)
            const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/user/update/contactinfo`
            const api = await fetch(location, {
                method: 'PUT',
                headers: { ...Header, 'Authorization': `Bearer ${access}` },
                body: body
            })
            const d = await api.json()
            console.log(d);
            res.status(api.status).end()
        } catch (error) {
            res.status(500).end()
        }
    } else {
        res.setHeader('Allow', ['PUT'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}