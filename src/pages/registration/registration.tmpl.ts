export const template = '{{{form}}}';

export const formTemplate = `
    <h1 class="form__title">{{title}}</h1>
    
    {{{inputs}}}
    
    {{#with buttonEnter as | button | }}
        {{{button}}}
    {{/with}}

    <a href="{{formLink.link}}" class="form__link">{{formLink.text}}</a>  
`;
