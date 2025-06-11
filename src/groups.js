// import { Group } from './types';
// import { loadGroups, saveGroups } from './storage';
function addGroup(name) {
    var groups = loadGroups();
    if (!groups.find(function (g) { return g.name === name; })) {
        groups.push({ name: name, contacts: [] });
        saveGroups(groups);
    }
    return groups;
}
function deleteGroup(name) {
    var groups = loadGroups();
    groups = groups.filter(function (g) { return g.name !== name; });
    saveGroups(groups);
    return groups;
}
