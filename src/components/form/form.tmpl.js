const template = `
    <form class="form">
        <h1 class="form__title">{{title}}</h1>
        
        {{#each inputs}}
            {{> input}}
        {{/each}}
        
        {{#with buttonEnter as | button | }}
            {{> button}}
        {{/with}}
    
        <a href="{{formLink.link}}" class="form__link">{{formLink.text}}</a>
    </form>
`;

export default template;
