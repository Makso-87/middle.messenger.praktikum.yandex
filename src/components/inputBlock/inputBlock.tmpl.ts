const template = `
    {{#if label}}
        <label for="{{id}}" class="input-item__label">{{label}}</label>
    {{/if}}
    
    {{{input}}}
    
    {{#if error}}
        <div class="input-item__error">{{errorText}}</div>
    {{/if}}
`;

export default template;
