// Заготовка для будущей логики работы с контактами
// import { Group, Contact } from './types';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function addContactToGroup(groups, groupName, contact) {
    return groups.map(function (g) { return g.name === groupName ? __assign(__assign({}, g), { contacts: __spreadArray(__spreadArray([], g.contacts, true), [contact], false) }) : g; });
}
function removeContactFromGroup(groups, groupName, contactId) {
    return groups.map(function (g) { return g.name === groupName ? __assign(__assign({}, g), { contacts: g.contacts.filter(function (c) { return c.id !== contactId; }) }) : g; });
}
