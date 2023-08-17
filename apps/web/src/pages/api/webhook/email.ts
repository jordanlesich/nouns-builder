import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Handle email webhook payload here
    // ...
    console.log('')
    res.status(200).send({ status: 'Email webhook received' })
  } else {
    res.status(405).send({ error: 'Method Not Allowed' })
  }
}
