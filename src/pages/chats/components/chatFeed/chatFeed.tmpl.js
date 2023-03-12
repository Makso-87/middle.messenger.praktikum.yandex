const template = `
    <div class="chat-feed">
        <div class="chat-feed__profile-button">
            <a href="profile">Профиль</a>
        </div>

        <div class="chat-feed__search">
            <input class="feed__search-input" type="text" placeholder="Поиск">
        </div>
        
        <ul class="chat-feed__chats-list">
            {{#each chatsList}}
                {{> chatItem}}
            {{/each}}
        </ul>
    </div>
`;

export default template;
