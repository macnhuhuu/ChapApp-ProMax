'use client'

import { Plus } from 'lucide-react'


import { useModal } from '@/hooks/use-modal-store'
import React, { useCallback } from 'react'
import { ActionTooltip } from '../ui/action-tooltip'

export const NavigationAction = () => {
  const { onOpen } = useModal()

  const handleOpen = useCallback(() => {
    onOpen('createServer')
  }, [onOpen])

  return (
    <div>
      <ActionTooltip side='right' align='center' label='Add a Server'>
        <button onClick={handleOpen} className='group flex items-center'>
          <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-slate-100 dark:bg-neutral-700 group-hover:bg-emerald-500'>
            <Plus
              className='group-hover:text-white transition text-emerald-500'
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}