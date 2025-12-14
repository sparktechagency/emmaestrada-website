import Container from "@/components/shared/Container"
import PromotorListHeader from "./PromotorListHeader"
import PromotorsDataTable from "./PromotorsDataTable"

export default function PromotorList() {

    return (
        <Container>
            <PromotorListHeader />
            <PromotorsDataTable />
        </Container>
    )
}
