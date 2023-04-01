const template = `
    {{#if label}}
        <label for="{{id}}" class="input-item__label">{{label}}</label>
    {{/if}}
    
    {{{input}}}
    
    {{#if errorMessage}}
        {{{errorMessage}}}
    {{/if}}
`;

export default template;
