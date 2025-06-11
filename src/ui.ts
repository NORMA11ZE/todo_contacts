/**
 * Генерирует HTML для списка групп в боковом меню
 */
function renderGroupsList(groups, container, onSelect, onDelete) {
  container.innerHTML = '';
  groups.forEach(group => {
    const div = document.createElement('div');
    div.className = 'group_name';
    div.innerHTML = `
      <div class="name">${group.name}</div>
      <div class="delit" title="Удалить группу" data-group-name="${group.name}">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <g clip-path="url(#clip0_1193_1981)">
            <path d="M6.66493 20.3889C6.66493 21.55 7.61493 22.5 8.77604 22.5H17.2205C18.3816 22.5 19.3316 21.55 19.3316 20.3889V7.72222H6.66493V20.3889ZM9.2616 12.8733L10.7499 11.385L12.9983 13.6228L15.236 11.385L16.7244 12.8733L14.4866 15.1111L16.7244 17.3489L15.236 18.8372L12.9983 16.5994L10.7605 18.8372L9.27215 17.3489L11.5099 15.1111L9.2616 12.8733ZM16.6927 4.55556L15.6372 3.5H10.3594L9.30382 4.55556H5.60938V6.66667H20.3872V4.55556H16.6927Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1193_1981">
              <rect width="25.3333" height="25.3333" fill="white" transform="translate(0.332031 0.333496)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    `;
    div.querySelector('.name')?.addEventListener('click', () => onSelect(group));
    div.querySelector('.delit')?.addEventListener('click', (e) => {
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
  let html = '<div class="ws_groups">';
  for (const group of groups) {
    const isOpen = openedGroups.indexOf(group.name) !== -1;
    html += `<div class="ws_group${isOpen ? ' ws_group_open' : ''}" data-group-name="${group.name}" tabindex="0">`;
    html += `<div class="ws_group_title">`;
    html += `<img class="ws_arrow" src="img/arrow.svg" alt="arrow" style="transform:rotate(${isOpen ? 180 : 0}deg);">`;
    html += `${group.name}</div>`;
    html += `<div class="ws_group_contacts" style="display:${isOpen ? 'block' : 'none'};">`;
    html += `<div class="ws_contacts_empty">Нет контактов</div>`;
    html += '</div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}
