'use client';

import { Button } from '@/components/ui/button';
import { revalidate } from '@/helpers/revalidateHelper';
import { myFetch } from '@/utils/myFetch';
import { Link, Plus } from 'lucide-react';
import { toast } from 'sonner';

const TableAction = ({ id, isFollowing }: { id: string, isFollowing: boolean }) => {

    const handleFollow = async (id: string) => {
        try {
            const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id } });            
            if (res?.success) {
                revalidate("promotors")
                toast.success("Created Chat Successfully")
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async (id: string) => {
        try {
            const res = await myFetch("/followers/follow", { method: "DELETE", body: { followingId: id } });
            
            if (res?.success) {
                revalidate("CREATOR")
                toast.success("Created Chat Successfully")
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex items-center gap-3">
            {isFollowing ? <Button onClick={() => handleUnFollow(id)} variant="outline" className="w-24 border border-primary text-primary bg-transparent"
            >Following
            </Button> :
                <Button onClick={() => handleFollow(id)} className="w-24"><span>Follow</span> <Plus /></Button>
            }

            <Link href={`/creator/promotor/${id}`}> <Button
                className="border border-black/50 text-black/50 hover:bg-white hover:text-black bg-transparent"
            >View</Button></Link>
        </div>
    )
}

export default TableAction