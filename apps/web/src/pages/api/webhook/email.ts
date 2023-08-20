import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

import { TestTemplate } from 'src/modules/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('req.body', req.body)
  const data = await resend.emails.send({
    from: 'alerts@jord.email',
    to: ['jordan.lesich@gmail.com'],
    subject: 'Hello from nouns.build!',
    react: TestTemplate({ name: 'test' }),
  })
  console.log('data', data)
  res.status(200).send(data)
}
