import { imageUrl } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import { Badge } from '../../badge'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const ChatBoxHeader = ({ participantInfo }: any) => {
    const route  = useRouter();

    return (
        <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
            <ArrowLeft size={20} onClick={()=>route.back()} className='md:hidden -mr-1'/>
                <Avatar className="w-12 h-12">
                    <AvatarImage
                        src={`${participantInfo?.image &&
                            participantInfo?.image.startsWith('http') ? `${participantInfo?.image}`
                            : participantInfo?.image ? `${imageUrl}${participantInfo?.image}` : "/placeholder.png"}`}
                    />
                    <AvatarFallback>OR</AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="font-semibold text-lg">{participantInfo?.name ?? "Unknowen"}</h2>
                    <Badge variant="outline">{participantInfo?.role ?? "UNKNOWN"}</Badge>
                </div>
            </div>
        </div>
    )
}

export default ChatBoxHeader