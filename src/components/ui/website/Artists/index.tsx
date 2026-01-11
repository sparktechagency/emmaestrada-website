import CommonHeader from '@/components/shared/CommonHeader'
import Container from '@/components/shared/Container'
import FooterBanner from '@/components/shared/FooterBanner'
import { IUser } from '@/types/profile'
import ArtHeader from './ArtHeader'
import ArtistCard from '@/components/shared/ArtistCard'
import ManagePagination from '@/components/shared/ManagePagination'
import getProfile from '@/utils/getProfile'

const AllCreators = async ({ data }: { data: any }) => {
  const user = await getProfile()
  return (
    <div className="">
      <CommonHeader title="Creators" />
      <Container>
        <ArtHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:mt-20">

          {data?.data && data?.data?.map((d:IUser) => (
            <ArtistCard data={d} userRole={user?.role}/>            
          ))}
        </div>
        <ManagePagination meta={data?.meta}/>
      </Container>
      <FooterBanner />
      <div className="absolute -left-[350px]  -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
    </div>
  )
}

export default AllCreators