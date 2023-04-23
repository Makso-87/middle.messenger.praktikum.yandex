const template = `
    {{#if url}}
        <img class="avatar__image" src="https://ya-praktikum.tech/api/v2/resources/{{url}}" alt="" />
    {{else}}
        <div class="avatar__image"></div>
    {{/if}}
    
    
    {{#if input}}
        <div class="avatar__change-button">
            {{{input}}}
            <label class="avatar__change-button-label" for="{{inputId}}"></label>
        </div>
    {{/if}}
`;

export default template;
