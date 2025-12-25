import Container from "@/components/shared/Container"
import PromotorListHeader from "./PromotorListHeader"
import PromotorsDataTable from "./PromotorsDataTable"
import ManagePagination from "@/components/shared/ManagePagination"

export default function PromotorList({promotorData}:any) {

    return (
        <Container>
            <PromotorListHeader />
            <PromotorsDataTable promotorData={promotorData?.data}/>
            <ManagePagination meta={promotorData?.meta}/>
        </Container>
    )
}
