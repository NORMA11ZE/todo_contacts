// Заготовка для будущей логики работы с контактами
// import { Group, Contact } from './types';

function addContactToGroup(groups, groupName, contact) {
  return groups.map(g => g.name === groupName ? { ...g, contacts: [...g.contacts, contact] } : g);
}

function removeContactFromGroup(groups, groupName, contactId) {
  return groups.map(g => g.name === groupName ? { ...g, contacts: g.contacts.filter(c => c.id !== contactId) } : g);
}
