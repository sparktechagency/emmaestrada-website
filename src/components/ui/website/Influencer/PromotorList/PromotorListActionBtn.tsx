'use client'
import { Button } from '@/components/ui/button'
import { revalidate } from '@/helpers/revalidateHelper'
import { myFetch } from '@/utils/myFetch'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const PromotorListActionBtn = ({ row }: any) => {        
    const searchParams = useSearchParams()
    const type = searchParams.get("type");

    const handleFollow = async (id: string) => {
        try {
            const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id } });            
            
            if (res?.success) {
                revalidate("promotors")
                toast.success(res?.message)
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async (id: string) => {
        try {
            const res = await myFetch(`/followers/unfollow/${id}`, { method: "DELETE" });
            if (res?.success) {
                revalidate("promotors")
                toast.success("Unfollowed Successfully")
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isFollowing = row?.isFollowing || type === "followed";

    return (
        <div className="flex items-center gap-3">
            {isFollowing ? <Button onClick={() => handleUnFollow(row._id)} variant="outline" className="w-24 border border-primary text-primary bg-transparent"
            >Following
            </Button> :
                <Button onClick={() => handleFollow(row._id)} className="w-24"><span>Follow</span> <Plus /></Button>
            }
            <Link href={`/creator/promotor/${row?._id}`}> <Button
                className="border border-black/50 text-black/50 hover:bg-white hover:text-black bg-transparent"
            >
                View
            </Button></Link>
        </div>
    )
}

export default PromotorListActionBtn