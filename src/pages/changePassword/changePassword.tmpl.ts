export const template = '{{{ form }}}';

export const formTemplate = `
    <h1 class="profile__title">Смена пароля</h1>

    <div class="profile__inputs">
        {{{ inputs }}}
    </div>

    <div class="profile__buttons">
        <div class="profile__buttons-edit-group margin_none">
            {{{ buttonCancel }}}
            {{{ buttonSave }}}
        </div>
    </div>
`;
