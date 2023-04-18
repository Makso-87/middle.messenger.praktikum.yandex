export const template = `
    {{{chatFeed}}}
    {{{messageFeed}}}
`;

export const formTemplate = `
    <h2 class="chat-feed__modal-title">Добавить чат</h2> 
    {{{input}}}
    {{{closeButton}}}
    
    {{#if errorMessage}}
        {{{errorMessage}}}
    {{/if}}
    
    {{{submitNewChatButton}}}
`;
