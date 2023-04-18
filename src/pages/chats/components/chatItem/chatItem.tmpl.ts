const template = `
<!--    <a href="chat" class="chat-item__link">-->
        {{{avatar}}}

        <div class="chat-item__data">
            <div class="chat-item__name">{{name}}</div>
            <div class="chat-item__message-preview">{{lastMessage}}</div>
            <div class="chat-item__time">{{lastMessageTime}}</div>
            <div class="chat-item__message-counter">{{newMessagesCount}}</div>
        </div>
<!--    </a>-->
`;

export default template;
