import Container from '@/components/shared/Container';

import PChatBox from './PChatBox';
import PMessageSidebar from './PMessageSidebar';

const PMessages = async ({ chatList, response }: any) => {
    return (
        <div>
            <Container >
                <div className="my-6">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Messages</h1>
                    <p className="textPara">Connection between music promoter and creator</p>
                </div>
                <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden md:gap-5 pb-20">                    
                    <PMessageSidebar />
                    <PChatBox  />
                </div>
            </Container>
        </div>
    )
}

export default PMessages