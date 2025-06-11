/// ...imports removed for browser compatibility...
// Основная инициализация приложенияо import используем глобальные переменные (если нужно, можно объединить всё в один файл для браузера)
// import { Group } from './src/types';
// import { loadGroups, saveGroups } from './src/storage';
// import { renderGroupsList, renderGroupsAccordion } from './src/ui';
// import { addGroup, deleteGroup } from './src/groups';
// import { renderAppLayout } from './src/layout';

// Основная инициализация приложения

document.addEventListener('DOMContentLoaded', function() {
    // Генерируем структуру приложения
    let root = document.getElementById('app');
    if (!root) {
        root = document.createElement('div');
        root.id = 'app';
        document.body.appendChild(root);
    }
    renderAppLayout(root);

    // DOM-элементы
    const groupsBtn = document.querySelector('.btn.groups') as HTMLElement | null;
    const menuBlock = document.querySelector('.groups_menu_block') as HTMLElement | null;
    const overlay = document.querySelector('.groups_menu_overlay') as HTMLElement | null;
    const closeBtn = menuBlock ? (menuBlock.querySelector('.close') as HTMLElement | null) : null;
    const groupList = document.querySelector('.group_list') as HTMLElement | null;
    const addGroupBtn = document.querySelector('.group_btns .add.btn') as HTMLElement | null;
    const saveGroupBtn = document.querySelector('.group_btns .save.btn') as HTMLElement | null;
    const workSpace = document.querySelector('.work_space') as HTMLElement | null;
    // Модалка подтверждения удаления
    const confirmOverlay = document.querySelector('.confirm_delete_overlay') as HTMLElement | null;
    const confirmModal = document.querySelector('.confirm_delete_modal') as HTMLElement | null;
    let menuWasOpenBeforeModal = false;
    let selectedGroup: string = '';
    let openedGroups: string[] = [];

    // Открытие/закрытие меню
    function openMenu() {
        menuBlock?.classList.add('open');
        overlay?.classList.add('open');
    }
    function closeMenu() {
        menuBlock?.classList.remove('open');
        overlay?.classList.remove('open');
    }
    // Открытие/закрытие модалки
    function openConfirm() {
        menuWasOpenBeforeModal = !!(menuBlock && menuBlock.classList.contains('open'));
        closeMenu();
        if (confirmOverlay) confirmOverlay.style.display = '';
        if (confirmModal) confirmModal.style.display = '';
        confirmOverlay?.classList.add('open');
        confirmModal?.classList.add('open');
    }
    function closeConfirm() {
        confirmOverlay?.classList.remove('open');
        confirmModal?.classList.remove('open');
        if (menuWasOpenBeforeModal) openMenu();
    }

    // Рендер списка групп в меню
    function updateGroupsMenu() {
        const groups = loadGroups();
        if (groupList) {
            renderGroupsList(groups, groupList, onSelectGroup, onDeleteGroup);
        }
    }
    // Рендер групп в рабочей области
    function updateWorkspace(selected: string) {
        const groups = loadGroups();
        // Удаляем автоматическое открытие выбранной группы
        if (workSpace) {
            renderGroupsAccordion(groups, openedGroups, workSpace);
            // Навешиваем обработчик на заголовки групп
            const titles = workSpace.querySelectorAll('.ws_group_title');
            titles.forEach(title => {
                title.addEventListener('click', function() {
                    const groupDiv = this.parentElement;
                    const groupName = groupDiv.getAttribute('data-group-name');
                    if (!groupName) return;
                    if (openedGroups.indexOf(groupName) !== -1) {
                        openedGroups = openedGroups.filter(name => name !== groupName);
                    } else {
                        openedGroups.push(groupName);
                    }
                    updateWorkspace(selectedGroup);
                });
            });
        }
    }
    // Обработчик выбора группы
    function onSelectGroup(group: Group) {
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
        let groupToDelete = group;
        // Подтверждение удаления
        const yesBtn = confirmModal?.querySelector('.confirm_delete_yes');
        const noBtn = confirmModal?.querySelector('.confirm_delete_no');
        const modCloseBtn = confirmModal?.querySelector('.mod_close');
        function cleanup() {
            yesBtn?.removeEventListener('click', onYes);
            noBtn?.removeEventListener('click', onNo);
            modCloseBtn?.removeEventListener('click', onNo);
            confirmOverlay?.removeEventListener('click', onNo);
        }
        function onYes(e) {
            e?.stopPropagation();
            cleanup();
            deleteGroup(groupToDelete.name);
            // Удаляем группу из openedGroups
            openedGroups = openedGroups.filter(name => name !== groupToDelete.name);
            updateGroupsMenu();
            updateWorkspace(selectedGroup);
            closeConfirm();
        }
        function onNo(e) {
            e?.stopPropagation();
            cleanup();
            closeConfirm();
        }
        yesBtn?.addEventListener('click', onYes);
        noBtn?.addEventListener('click', onNo);
        modCloseBtn?.addEventListener('click', onNo);
        confirmOverlay?.addEventListener('click', onNo);
    }

    // Кнопка "Группы"
    groupsBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (menuBlock?.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    closeBtn?.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });
    overlay?.addEventListener('click', closeMenu);

    // Кнопка "Добавить группу"
    addGroupBtn?.addEventListener('click', function() {
        if (!groupList) return;
        // Проверка на незавершённый ввод
        if (groupList.querySelector('.group_name input')) return;
        const div = document.createElement('div');
        div.className = 'group_name new_group';
        div.innerHTML = `<input type="text" class="name_input" placeholder="Имя группы" autofocus />`;
        groupList.prepend(div);
        const input = div.querySelector('input') as HTMLInputElement;
        input.focus();
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') saveGroupBtn?.click();
        });
    });

    // Кнопка "Сохранить группу"
    saveGroupBtn?.addEventListener('click', function() {
        if (!groupList) return;
        const newDiv = groupList.querySelector('.group_name.new_group');
        if (!newDiv) return;
        const input = newDiv.querySelector('input') as HTMLInputElement | null;
        let errorDiv = newDiv.querySelector('.input_error') as HTMLElement | null;
        if (!input || input.value.trim() === '') {
            input?.classList.add('input_error_border');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'input_error';
                errorDiv.textContent = 'Поле является обязательным';
                newDiv.appendChild(errorDiv);
            }
            input?.focus();
            return;
        } else {
            input.classList.remove('input_error_border');
            errorDiv?.remove();
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
