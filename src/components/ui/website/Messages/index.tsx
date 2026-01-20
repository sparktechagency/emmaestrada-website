import Container from '@/components/shared/Container'
import React from 'react'
import MessageSidebar from './MessageSidebar'
import ChatABox from './ChatABox'
import { myFetch } from '@/utils/myFetch'

const Messages = async ({ chatList, response }: any) => {

    return (
        <div>
            <Container >
                <div className="my-6">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Messages</h1>
                    <p className="textPara">Connection between music promoter and creator</p>
                </div>
                <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden md:gap-5 pb-20 bg-transparent">
                    {/* <MessageSidebar chatData={chatList} /> */}
                    {/* <MessageSidebar /> */}
                    {/* <ChatABox  /> */}
                </div>
            </Container>
        </div>
    )
}

export default Messages