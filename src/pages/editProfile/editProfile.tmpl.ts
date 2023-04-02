export const template = `
    <div class="profile">
        {{{ form }}}
    </div>
`;

export const formTemplate = `
    <h1 class="profile__title">Редактирование профиля</h1>

    {{{ avatar }}}

    <div class="profile__current-name">{{firstName}}</div>

    <div class="profile__inputs">
        {{{ inputs }}}
    </div>

    <div class="profile__buttons">
        <div class="profile__buttons-edit-group margin_none">
            {{{ buttonCancel }}}
            {{{ buttonSave }}}
        </div>
    </div>
    
    {{#if errorMessage}}
        {{{errorMessage}}}
    {{/if}}
`;
