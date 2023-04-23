const template = `
<!--    <a href="chat" class="chat-item__link">-->
        {{{avatar}}}

        <div class="chat-item__data">
            <div class="chat-item__name">{{name}}</div>
            {{#if author}}
                <div class="chat-item__message-preview">
                    <div class="chat-item__message-author">
                        {{{author}}}:
                    </div>
                    <div class="chat-item__message-text">
                        {{lastMessage}}
                    </div>
                </div>
            {{/if}}
            
            {{#if lastMessageTime}}
                <div class="chat-item__time">{{lastMessageTime}}</div>
            {{/if}}
            {{#if newMessagesCount}}
                <div class="chat-item__message-counter">{{newMessagesCount}}</div>
            {{/if}}
        </div>
<!--    </a>-->
`;

export default template;
