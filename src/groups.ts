// import { Group } from './types';
// import { loadGroups, saveGroups } from './storage';

function addGroup(name) {
  const groups = loadGroups();
  if (!groups.find(g => g.name === name)) {
    groups.push({ name, contacts: [] });
    saveGroups(groups);
  }
  return groups;
}

function deleteGroup(name) {
  let groups = loadGroups();
  groups = groups.filter(g => g.name !== name);
  saveGroups(groups);
  return groups;
}
