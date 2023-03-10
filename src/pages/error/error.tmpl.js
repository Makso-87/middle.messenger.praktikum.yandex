const template = `
    <div class="error-page">
        <h1 class="error-title">{{errorCode}}</h1>
        
        {{#each errorDescription}}
            <div class="error-description">{{this}}</div>
        {{/each}}
        
        {{> button errorButton}}
    </div>
`;

export default template;
