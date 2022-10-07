import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'DELETE'){
        try {
            const { id } = req.query
            const cookies = cookie.parse(req.headers.cookie ?? '')
            const access = cookies._Session_AID_ ?? false
            const location = process.env.NEXT_PUBLIC_API_URL + `/components/${id}/`
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
        res.setHeader('Allow', ['DELETE'])
        res.status(405).json({ detail: `${req.method} method is not allowed` })
    }
}