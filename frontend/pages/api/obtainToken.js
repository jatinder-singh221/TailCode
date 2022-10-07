import cookie from 'cookie'
import { Header } from "@/provider/provider.Headers"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const location = process.env.NEXT_PUBLIC_API_URL + `/obtain/token`
      const body = JSON.stringify(req.body)
      const api = await fetch(location, { method: 'POST', headers: Header, body: body })

      if (api.status === 200) {
        const apiRes = await api.json()

        res.setHeader('Set-Cookie', [
          cookie.serialize(
            '_Session_AID_', String(apiRes.access), {
            path: '/', httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
          }),

          cookie.serialize(
            '_Session_RID_', String(apiRes.refresh), {
            path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 10, sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
          })
        ])
      }
      res.status(api.status).end()
    } catch (error) { res.status(500).end() }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ detail: `${req.method} method is not allowed` })
  }
}
