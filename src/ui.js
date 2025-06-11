/**
 * Генерирует HTML для списка групп в боковом меню
 */
function renderGroupsList(groups, container, onSelect, onDelete) {
    container.innerHTML = '';
    groups.forEach(function (group) {
        var _a, _b;
        var div = document.createElement('div');
        div.className = 'group_name';
        div.innerHTML = "\n      <div class=\"name\">".concat(group.name, "</div>\n      <div class=\"delit\" title=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443\" data-group-name=\"").concat(group.name, "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n          <g clip-path=\"url(#clip0_1193_1981)\">\n            <path d=\"M6.66493 20.3889C6.66493 21.55 7.61493 22.5 8.77604 22.5H17.2205C18.3816 22.5 19.3316 21.55 19.3316 20.3889V7.72222H6.66493V20.3889ZM9.2616 12.8733L10.7499 11.385L12.9983 13.6228L15.236 11.385L16.7244 12.8733L14.4866 15.1111L16.7244 17.3489L15.236 18.8372L12.9983 16.5994L10.7605 18.8372L9.27215 17.3489L11.5099 15.1111L9.2616 12.8733ZM16.6927 4.55556L15.6372 3.5H10.3594L9.30382 4.55556H5.60938V6.66667H20.3872V4.55556H16.6927Z\" fill=\"white\"/>\n          </g>\n          <defs>\n            <clipPath id=\"clip0_1193_1981\">\n              <rect width=\"25.3333\" height=\"25.3333\" fill=\"white\" transform=\"translate(0.332031 0.333496)\"/>\n            </clipPath>\n          </defs>\n        </svg>\n      </div>\n    ");
        (_a = div.querySelector('.name')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return onSelect(group); });
        (_b = div.querySelector('.delit')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (e) {
            e.stopPropagation();
            onDelete(group);
        });
        container.appendChild(div);
    });
}
/**
 * Генерирует рабочую область с аккордеоном групп
 */
function renderGroupsAccordion(groups, openedGroups, container) {
    var html = '<div class="ws_groups">';
    for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
        var group = groups_1[_i];
        var isOpen = openedGroups.indexOf(group.name) !== -1;
        html += "<div class=\"ws_group".concat(isOpen ? ' ws_group_open' : '', "\" data-group-name=\"").concat(group.name, "\" tabindex=\"0\">");
        html += "<div class=\"ws_group_title\">";
        html += "<img class=\"ws_arrow\" src=\"img/arrow.svg\" alt=\"arrow\" style=\"transform:rotate(".concat(isOpen ? 180 : 0, "deg);\">");
        html += "".concat(group.name, "</div>");
        html += "<div class=\"ws_group_contacts\" style=\"display:".concat(isOpen ? 'block' : 'none', ";\">");
        html += "<div class=\"ws_contacts_empty\">\u041D\u0435\u0442 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432</div>";
        html += '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
}
