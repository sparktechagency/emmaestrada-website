import Container from "@/components/shared/Container"
import PromotorListHeader from "./PromotorListHeader"
import PromotorsDataTable from "./PromotorsDataTable"
import ManagePagination from "@/components/shared/ManagePagination"

export default function PromotorList({promotorData}:any) {

    return (
        <Container>
            <div className="mb-20">
            <PromotorListHeader />
            <PromotorsDataTable promotorData={promotorData?.data}/>
            <ManagePagination meta={promotorData?.meta}/>
            </div>
        </Container>
    )
}
