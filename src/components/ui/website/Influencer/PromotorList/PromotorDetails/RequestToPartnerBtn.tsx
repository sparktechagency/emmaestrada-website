'use client'
import { Button } from '@/components/ui/button'
import { myFetch } from '@/utils/myFetch'
import { toast } from 'sonner'

const RequestToPartnerBtn = ({ promoterId }: any) => {
    const handleClick = async () => {
        try {
            const response = await myFetch(`/followers/promoter/${promoterId}/become-partner`, { method: 'POST' });            
            if(response?.success){
              toast.success(response?.message);
            }
        } catch (error) {
            console.error("Error requesting to become partner:", error);
        }
    }


    return (
        <div className="flex items-center justify-end mt-10">
            <Button onClick={() => handleClick()} size="lg" className=" bg-blue-600! text-white rounded-full shadow-md">Become Partner</Button>
        </div>
    )
}

export default RequestToPartnerBtn