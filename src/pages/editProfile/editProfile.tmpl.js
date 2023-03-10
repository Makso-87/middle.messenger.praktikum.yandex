const template = `
    <div class="profile">
        <form class="form form_edit-profile">
            <h1 class="profile__title">Редактирование профиля</h1>

            {{> avatar}}

            <div class="profile__current-name">{{firstName}}</div>

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
