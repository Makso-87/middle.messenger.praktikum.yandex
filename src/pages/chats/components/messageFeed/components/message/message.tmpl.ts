export const template = `
    {{{avatar}}}
    
    <div class="message__text-container">
        <div class="message__text">{{text}}</div>
        
        <div class="message__bottom-info">
            <div class="message__time">{{time}}</div>
            
            {{#if sent}}
                <div class="message__sent"></div>
            {{/if}}
            
            {{#if delivered}}
                <div class="message__delivered"></div>
            {{/if}}
        
            {{#if read}}
                <div class="message__read"></div>
            {{/if}}
        </div>
    </div>
    
`;
