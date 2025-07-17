import { message } from "antd"

interface ConversationItemProps{
    messageType?:"voice"|"message"
    isTyping?:boolean,
    unread?:boolean,
    unreadCount?:number
}

const messageTypeMap = {
    message:<p className="text-[#999999]">Yes Thats Great</p>,
    voice:<div className="flex items-center gap-x-2 text-[#212121]">
        <span><i className="bi bi-mic"></i></span>
        <p>Voice Message</p>
    </div>,
}

function ConversationItem({messageType="message",unread=false,unreadCount=0,isTyping=false}:ConversationItemProps){
    return (
        <li className="border-b py-4 gap-x-3 border-[#999999]  flex items-center">
            <div>
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1">
                <header className="flex items-center justify-between">
                    <p className="font-semibold">Firstname LastName</p>
                    <p className="text-sm font-medium text-[#A9ABAD]">4:30pm</p>
                </header>
                <footer className="flex items-center justify-between">
                    {isTyping?<p className="text-[#258C60]">Typing...</p>:messageTypeMap[messageType]}
                    {unread && (
                        <div className="bg-red-500 rounded-full text-white h-4 w-4 flex items-center justify-center text-sm">
                        <p>{unreadCount}</p>
                    </div>
                    )}
                    {!unread && (
                     <span className="text-[#41D37E]"><i className="bi bi-check2-all"></i></span>
                    )}
                </footer>
            </div>
        </li>
    )
}

export default function ConversationList(){
    return (
        <ul className="border border-[#999999] space-y-4 rounded-lg p-4">
            <ConversationItem unread/>
            <ConversationItem isTyping/>
            <ConversationItem/>
            <ConversationItem messageType="voice"/>
            <ConversationItem/>
            <ConversationItem/>
            <ConversationItem/>
        </ul>
    )
}