const template = `
    <div class="profile">
        <form class="form form_edit-change-password">
            <h1 class="profile__title">Смена пароля</h1>
    
            <div class="profile__inputs">
                {{#each inputs}}
                    {{> input}}
                {{/each}}
            </div>
    
            <div class="profile__buttons">
                <div class="profile__buttons-edit-group margin_none">
                    {{> button buttonCancel}}
                    {{> button buttonSave}}
                </div>
            </div>
        </form>
    </div>
`;

export default template;
