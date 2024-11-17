import { db } from '@/lib/db'
import { Conversation, Member } from '@prisma/client'

interface ExtendedConversation extends Conversation {
  memberOne: Member & { profile: { name: string; imageUrl: string } }
  memberTwo: Member & { profile: { name: string; imageUrl: string } }
}

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
): Promise<ExtendedConversation | null> => { // Đảm bảo kiểu trả về là ExtendedConversation hoặc null
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId))

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId)
  }

  return conversation
}

const findConversation = async (
  memberOneId: string,
  memberTwoId: string
): Promise<ExtendedConversation | null> => { // Đảm bảo kiểu trả về là ExtendedConversation hoặc null
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
): Promise<ExtendedConversation | null> => { // Đảm bảo kiểu trả về là ExtendedConversation hoặc null
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
