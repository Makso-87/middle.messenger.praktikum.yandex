const template = `
    <img class="avatar__image" src="{{url}}" alt="" />
    
    {{#if input}}
        <div class="avatar__change-button">
            {{{input}}}
            <label class="avatar__change-button-label" for="{{inputId}}"></label>
        </div>
    {{/if}}
`;

export default template;
