const template = `
    <li class="chat-item">
        <a href="chat-item" class="chat-item__link">
            <div class="chat-item__avatar">
                <img class="chat-item__image" src="{{avatar}}" alt="" />
            </div>
    
            <div class="chat-item__data">
                <div class="chat-item__name">{{name}}</div>
                <div class="chat-item__message-preview">{{lastMessage}}</div>
                <div class="chat-item__time">{{lastMessageTime}}</div>
                <div class="chat-item__message-counter">{{newMessagesCount}}</div>
            </div>
        </a>
    </li>  
`;

export default template;
