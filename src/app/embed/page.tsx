import EmbedClient from '@/components/EmbedClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function page() {
  const session = await getSession()
  const ownerId = session?.user?.id ?? "";

  return (
    <>
      <EmbedClient ownerId={ownerId} />
    </>
  )
}

export default page
