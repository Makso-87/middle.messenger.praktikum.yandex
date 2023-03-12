const template = `
    <div class="profile">
        <div class="profile__data-container">
            <h1 class="profile__title">Профиль</h1>

            {{> avatar}}

            <div class="profile__current-name">{{firstName}}</div>

            <div class="profile__data">
                {{#each data}}
                    {{> profileDataItem}}
                {{/each}}
            </div>

            <div class="profile__buttons">
                <div class="profile__buttons-edit-group">
                    {{> button buttonEditProfile }}
                    {{> button buttonChangePassword }}
                </div>
                
                {{> button buttonBack }}
            </div>
        </div>
    </div>
`;

export default template;
