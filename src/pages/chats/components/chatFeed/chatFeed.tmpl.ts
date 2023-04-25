const template = `    
    <div class="chat-feed__top">
        {{{addChatButton}}}
    
        <div class="chat-feed__profile-button">
<!--            <a href="profile">Профиль</a>-->
            {{{profileButton}}}
        </div>
    </div>

    <div class="chat-feed__search">
        {{{input}}}
    </div>
    
    <ul class="chat-feed__chats-list">
        {{{chatsList}}}
    </ul>  
    
    {{{modalPopup}}}
`;

export default template;
