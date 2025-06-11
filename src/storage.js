// import { Group } from './types';
var GROUPS_KEY = 'groups';
function saveGroups(groups) {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}
function loadGroups() {
    var data = localStorage.getItem(GROUPS_KEY);
    try {
        var groups = data ? JSON.parse(data) : null;
        if (!Array.isArray(groups) || !groups.length || typeof groups[0] === 'string') {
            // Если нет данных или старый формат, возвращаем дефолтные группы
            groups = [
                { name: 'Друзья', contacts: [] },
                { name: 'Коллеги', contacts: [] }
            ];
            saveGroups(groups);
        }
        return groups;
    }
    catch (_a) {
        // Если ошибка парсинга, возвращаем дефолтные группы
        var groups = [
            { name: 'Друзья', contacts: [] },
            { name: 'Коллеги', contacts: [] }
        ];
        saveGroups(groups);
        return groups;
    }
}
