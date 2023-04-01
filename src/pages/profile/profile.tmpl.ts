const template = `
    <div class="profile__data-container">
        <h1 class="profile__title">Профиль</h1>

        {{{ avatar }}}

        <div class="profile__current-name">{{firstName}}</div>

        <div class="profile__data">
            {{{ data }}}
        </div>

        <div class="profile__buttons">
            <div class="profile__buttons-edit-group">
                {{{ buttonEditProfile }}}
                {{{ buttonChangePassword }}}
            </div>
            
            {{{ buttonBack }}}
        </div>
    </div>
`;

export default template;
