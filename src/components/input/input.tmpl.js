const template = `
    <div class="input-item">
        {{#if label}}
            <label for="{{id}}" class="input-item__label">{{label}}</label>
        {{/if}}
        <input type="{{type}}" class="input-item__input" name="{{name}}" id="{{id}}" placeholder="{{placeholder}}">
    </div>
`;

export default template;
