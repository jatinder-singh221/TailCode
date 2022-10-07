import cookie from 'cookie'
import { Header } from "@/provider/provider.Headers"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let url = ''
            const { page } = req.query ?? false
            page ? url = `/components/?page=${page}` : url = `/components/`
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + url
            const api = await fetch(location, {
                method: 'GET',
                headers: { ...Header, 'Authorization': `Bearer ${access}` },
            })
            if (api.status == 200) {
                const apiRes = await api.json()
                res.status(api.status).json(apiRes)
            }
            else res.status(api.status).end()
        } catch (error) {
            res.status(500).end()
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}