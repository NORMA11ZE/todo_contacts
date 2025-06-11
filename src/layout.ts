// Генерация базовой структуры приложения TO-DO Contacts
function renderAppLayout(root) {
    root.innerHTML = `
    <div class="menu">
        <div class="menu_btns">
            <div class="con_list"><img src="img/contact-book.svg"> Книга контактов</div>
            <div class="r_btn">
                <div class="btn add_con">Добавить контакт <img src="img/plus.svg"></div>
                <div class="btn groups">Группы</div>
            </div>
        </div>
    </div>
    <div class="groups_menu_overlay"></div>
    <div class="groups_menu_block">
        <div class="gm_head">
            <div class="head">Группы контаков</div>
            <div class="close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
                </svg>
            </div>
        </div>
        <div class="group_list"></div>
        <div class="group_btns">
            <div class="add btn">Добавить</div>
            <div class="save btn">Сохранить</div>
        </div>
    </div>
    <div class="add_con_mobile btn">Добавить контакт <img src="img/plus.svg"></div>
    <div class="work_space">
        <span class="empty_list_message">Список контактов пуст</span>
    </div>
    <div class="confirm_delete_overlay" style="display:none;"></div>
    <div class="confirm_delete_modal" style="display:none;">
        <div class="mod_close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
            </svg>
        </div>
        <div class="confirm_delete_content">
            <div class="confirm_delete_head">Удалить группу?</div>
            <div class="confirm_delete_text">Удаление группы повлечет за собой удаление контактов связанных с этой группой</div>
            <div class="confirm_delete_actions">
                <div class="confirm_delete_yes">Да, удалить</div>
                <div class="confirm_delete_no">Отмена</div>
            </div>
        </div>
    </div>
    `;
}
