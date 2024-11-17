import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
  // Nếu cần, bạn có thể thêm các kiểu dữ liệu cho các props khác tại đây
}

// Lưu ý là params sẽ phải là một đối tượng có thể resolve đúng kiểu
const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params?.inviteCode) { // Kiểm tra params.inviteCode
    return redirect('/')
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}

export default InviteCodePage
