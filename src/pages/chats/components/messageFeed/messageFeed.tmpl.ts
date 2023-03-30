const template = `
    {{#if chatItem }}
        {{{chatTop}}}
        {{{chatMiddle}}}
        {{{chatBottom}}}
        {{else}}
        <div class="plug-text">Выберите чат, чтобы отправить сообщение</div>
    {{/if}}
`;

export default template;
