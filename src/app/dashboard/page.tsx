import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function page() {
  const session = await getSession()
  const ownerId = session?.user?.id ?? "";

  return (
    <>
      <DashboardClient ownerId={ownerId} />
    </>
  )
}

export default page
