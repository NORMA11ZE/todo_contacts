/// ...imports removed for browser compatibility...
// Основная инициализация приложенияо import используем глобальные переменные (если нужно, можно объединить всё в один файл для браузера)
// import { Group } from './src/types';
// import { loadGroups, saveGroups } from './src/storage';
// import { renderGroupsList, renderGroupsAccordion } from './src/ui';
// import { addGroup, deleteGroup } from './src/groups';
// import { renderAppLayout } from './src/layout';
// Основная инициализация приложения
document.addEventListener('DOMContentLoaded', function () {
    // Генерируем структуру приложения
    var root = document.getElementById('app');
    if (!root) {
        root = document.createElement('div');
        root.id = 'app';
        document.body.appendChild(root);
    }
    renderAppLayout(root);
    // DOM-элементы
    var groupsBtn = document.querySelector('.btn.groups');
    var menuBlock = document.querySelector('.groups_menu_block');
    var overlay = document.querySelector('.groups_menu_overlay');
    var closeBtn = menuBlock ? menuBlock.querySelector('.close') : null;
    var groupList = document.querySelector('.group_list');
    var addGroupBtn = document.querySelector('.group_btns .add.btn');
    var saveGroupBtn = document.querySelector('.group_btns .save.btn');
    var workSpace = document.querySelector('.work_space');
    // Модалка подтверждения удаления
    var confirmOverlay = document.querySelector('.confirm_delete_overlay');
    var confirmModal = document.querySelector('.confirm_delete_modal');
    var menuWasOpenBeforeModal = false;
    var selectedGroup = '';
    var openedGroups = [];
    // Открытие/закрытие меню
    function openMenu() {
        menuBlock === null || menuBlock === void 0 ? void 0 : menuBlock.classList.add('open');
        overlay === null || overlay === void 0 ? void 0 : overlay.classList.add('open');
    }
    function closeMenu() {
        menuBlock === null || menuBlock === void 0 ? void 0 : menuBlock.classList.remove('open');
        overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove('open');
    }
    // Открытие/закрытие модалки
    function openConfirm() {
        menuWasOpenBeforeModal = !!(menuBlock && menuBlock.classList.contains('open'));
        closeMenu();
        if (confirmOverlay)
            confirmOverlay.style.display = '';
        if (confirmModal)
            confirmModal.style.display = '';
        confirmOverlay === null || confirmOverlay === void 0 ? void 0 : confirmOverlay.classList.add('open');
        confirmModal === null || confirmModal === void 0 ? void 0 : confirmModal.classList.add('open');
    }
    function closeConfirm() {
        confirmOverlay === null || confirmOverlay === void 0 ? void 0 : confirmOverlay.classList.remove('open');
        confirmModal === null || confirmModal === void 0 ? void 0 : confirmModal.classList.remove('open');
        if (menuWasOpenBeforeModal)
            openMenu();
    }
    // Рендер списка групп в меню
    function updateGroupsMenu() {
        var groups = loadGroups();
        if (groupList) {
            renderGroupsList(groups, groupList, onSelectGroup, onDeleteGroup);
        }
    }
    // Рендер групп в рабочей области
    function updateWorkspace(selected) {
        var groups = loadGroups();
        // Удаляем автоматическое открытие выбранной группы
        if (workSpace) {
            renderGroupsAccordion(groups, openedGroups, workSpace);
            // Навешиваем обработчик на заголовки групп
            var titles = workSpace.querySelectorAll('.ws_group_title');
            titles.forEach(function (title) {
                title.addEventListener('click', function () {
                    var groupDiv = this.parentElement;
                    var groupName = groupDiv.getAttribute('data-group-name');
                    if (!groupName)
                        return;
                    if (openedGroups.indexOf(groupName) !== -1) {
                        openedGroups = openedGroups.filter(function (name) { return name !== groupName; });
                    }
                    else {
                        openedGroups.push(groupName);
                    }
                    updateWorkspace(selectedGroup);
                });
            });
        }
    }
    // Обработчик выбора группы
    function onSelectGroup(group) {
        selectedGroup = group.name;
        // Открываем только выбранную группу, если она ещё не открыта
        if (openedGroups.indexOf(group.name) === -1) {
            openedGroups.push(group.name);
        }
        updateWorkspace(selectedGroup);
        closeMenu();
    }
    // Обработчик удаления группы
    function onDeleteGroup(group) {
        // Открываем модальное окно подтверждения
        openConfirm();
        // Сохраняем имя группы для удаления
        var groupToDelete = group;
        // Подтверждение удаления
        var yesBtn = confirmModal === null || confirmModal === void 0 ? void 0 : confirmModal.querySelector('.confirm_delete_yes');
        var noBtn = confirmModal === null || confirmModal === void 0 ? void 0 : confirmModal.querySelector('.confirm_delete_no');
        var modCloseBtn = confirmModal === null || confirmModal === void 0 ? void 0 : confirmModal.querySelector('.mod_close');
        function cleanup() {
            yesBtn === null || yesBtn === void 0 ? void 0 : yesBtn.removeEventListener('click', onYes);
            noBtn === null || noBtn === void 0 ? void 0 : noBtn.removeEventListener('click', onNo);
            modCloseBtn === null || modCloseBtn === void 0 ? void 0 : modCloseBtn.removeEventListener('click', onNo);
            confirmOverlay === null || confirmOverlay === void 0 ? void 0 : confirmOverlay.removeEventListener('click', onNo);
        }
        function onYes(e) {
            e === null || e === void 0 ? void 0 : e.stopPropagation();
            cleanup();
            deleteGroup(groupToDelete.name);
            // Удаляем группу из openedGroups
            openedGroups = openedGroups.filter(function (name) { return name !== groupToDelete.name; });
            updateGroupsMenu();
            updateWorkspace(selectedGroup);
            closeConfirm();
        }
        function onNo(e) {
            e === null || e === void 0 ? void 0 : e.stopPropagation();
            cleanup();
            closeConfirm();
        }
        yesBtn === null || yesBtn === void 0 ? void 0 : yesBtn.addEventListener('click', onYes);
        noBtn === null || noBtn === void 0 ? void 0 : noBtn.addEventListener('click', onNo);
        modCloseBtn === null || modCloseBtn === void 0 ? void 0 : modCloseBtn.addEventListener('click', onNo);
        confirmOverlay === null || confirmOverlay === void 0 ? void 0 : confirmOverlay.addEventListener('click', onNo);
    }
    // Кнопка "Группы"
    groupsBtn === null || groupsBtn === void 0 ? void 0 : groupsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (menuBlock === null || menuBlock === void 0 ? void 0 : menuBlock.classList.contains('open')) {
            closeMenu();
        }
        else {
            openMenu();
        }
    });
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeMenu();
    });
    overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener('click', closeMenu);
    // Кнопка "Добавить группу"
    addGroupBtn === null || addGroupBtn === void 0 ? void 0 : addGroupBtn.addEventListener('click', function () {
        if (!groupList)
            return;
        // Проверка на незавершённый ввод
        if (groupList.querySelector('.group_name input'))
            return;
        var div = document.createElement('div');
        div.className = 'group_name new_group';
        div.innerHTML = "<input type=\"text\" class=\"name_input\" placeholder=\"\u0418\u043C\u044F \u0433\u0440\u0443\u043F\u043F\u044B\" autofocus />";
        groupList.prepend(div);
        var input = div.querySelector('input');
        input.focus();
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter')
                saveGroupBtn === null || saveGroupBtn === void 0 ? void 0 : saveGroupBtn.click();
        });
    });
    // Кнопка "Сохранить группу"
    saveGroupBtn === null || saveGroupBtn === void 0 ? void 0 : saveGroupBtn.addEventListener('click', function () {
        if (!groupList)
            return;
        var newDiv = groupList.querySelector('.group_name.new_group');
        if (!newDiv)
            return;
        var input = newDiv.querySelector('input');
        var errorDiv = newDiv.querySelector('.input_error');
        if (!input || input.value.trim() === '') {
            input === null || input === void 0 ? void 0 : input.classList.add('input_error_border');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'input_error';
                errorDiv.textContent = 'Поле является обязательным';
                newDiv.appendChild(errorDiv);
            }
            input === null || input === void 0 ? void 0 : input.focus();
            return;
        }
        else {
            input.classList.remove('input_error_border');
            errorDiv === null || errorDiv === void 0 ? void 0 : errorDiv.remove();
        }
        // Добавление группы через бизнес-логику
        addGroup(input.value.trim());
        updateGroupsMenu();
        updateWorkspace(input.value.trim());
    });
    // Инициализация
    openedGroups = [];
    updateGroupsMenu();
    updateWorkspace(selectedGroup);
});
