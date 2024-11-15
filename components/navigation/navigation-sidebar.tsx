import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { NavigationAction } from './navigation-action'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NavigationItem } from './navigation-item'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '../ui/mode-toggle'

export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
  
    <div className='z-50 space-y-4 flex flex-col items-center h-full text-primary w-full py-3 bg-slate-300 dark:bg-[#1e1f22]'>
   
    <div className='pb-2 mt-auto flex items-center justify-center flex-col gap-y-3'>
    <Image src="/lo1.jpg" alt="Logo" width={46} height={46} className="group relative flex items-center rounded-[12px] shadow-lg"  />

</div>

<Separator className='h-[2.5px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-12 mx-auto mt-[-5px]' />

      <NavigationAction />
     
      <ScrollArea className='flex-1 w-full'>
        {servers.map((server) => (
          <div className='mb-4' key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
          
        ))}
          <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-12 mx-auto' />
      </ScrollArea>
      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-12 mx-auto' />
      <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
              userButtonPopoverCard: 'pointer-events-auto',
            },
          }}
        />
      </div>
     
    </div>
  )
}