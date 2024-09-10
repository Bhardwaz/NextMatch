import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'

const ChatPage = () => {
    return (
        <div>
            <CardHeader className="text-2xl font-semibold text-secondary" >
                Chat
            </CardHeader>
            <Divider />

            <CardBody>
                Chat Goes here
            </CardBody>

        </div>
    )
}

export default ChatPage