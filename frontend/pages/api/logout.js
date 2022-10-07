import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                '_Session_AID_', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'strict',
                    path: '/'
                }
            ),
            cookie.serialize(
                '_Session_RID_', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ])
        res.status(200).end()
    } catch (error) { res.status(500).end() }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ detail: `${req.method} method is not allowed` })
  }
}
