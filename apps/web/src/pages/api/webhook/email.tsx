import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

import VercelInviteUserEmail from 'src/modules/email/ReactEmailTest'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('req.body', req.body)
  const data = await resend.emails.send({
    from: 'alerts@jord.email',
    to: ['jordan.lesich@gmail.com'],
    subject: 'Hello from nouns.build!',
    react: <VercelInviteUserEmail />,
  })
  console.log('data', data)
  res.status(200).send(data)
}
