import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'

import { redirect } from 'next/navigation'

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

 
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: { in: ['General', 'general'] }, // Kiểm tra cả hai tên
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  // Nếu không có kênh "General"
  if (!server || !server.channels || server.channels.length === 0) {
    return redirect(`/servers/${params.serverId}`) // Điều hướng đến trang server nếu không tìm thấy kênh General
  }

  const initialChannel = server.channels[0]

  // Kiểm tra tên kênh, chỉ redirect nếu kênh "General" tồn tại
  if (initialChannel.name.toLowerCase() === 'General') {
    return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
  }

  return null
}

export default ServerIdPage
