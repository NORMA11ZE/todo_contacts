// Общие типы для групп и контактов
interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface Group {
  name: string;
  contacts: Contact[];
}
