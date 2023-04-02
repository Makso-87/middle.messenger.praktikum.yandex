export const template = '{{{form}}}';

export const formTemplate = `
    <h1 class="form__title">{{title}}</h1>
    
    {{{inputs}}}
    
    {{{button}}}
    
    {{#if errorMessage}}
        {{{errorMessage}}}
    {{/if}}

    <a href="{{formLink.link}}" class="form__link">{{formLink.text}}</a>  
`;
