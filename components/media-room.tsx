'use client'

import { useState, useEffect } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser()
  const [token, setToken] = useState<string>('') // Đảm bảo xác định kiểu dữ liệu cho token

  useEffect(() => {
    // Kiểm tra user và các thông tin cần thiết
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`

    const fetchToken = async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        if (!resp.ok) {
          throw new Error('Failed to fetch LiveKit token')
        }
        const data = await resp.json()
        setToken(data.token)
      } catch (error) {
        console.log('Error fetching LiveKit token:', error)
      }
    }

    fetchToken()
  }, [user?.firstName, user?.lastName, chatId])

  // Kiểm tra nếu token vẫn chưa được lấy
  if (token === '') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
      </div>
    )
  }

  // Kiểm tra nếu URL môi trường của LiveKit không có
  if (!process.env.NEXT_PUBLIC_LIVEKIT_URL) {
    return <div>Error: LiveKit URL is not configured.</div>
  }

  return (
    <LiveKitRoom
      data-lk-theme='default'
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
