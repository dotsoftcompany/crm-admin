import {
  User,
  Settings,
  Users,
  BookOpen,
  LayoutGrid,
  GraduationCapIcon,
  LayoutList,
} from 'lucide-react';

export function getMenuList(pathname) {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Asosiy',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Ro'yxatlar",
      menus: [
        {
          href: '/',
          label: 'Kurslar',
          active: pathname.includes('/courses'),
          icon: BookOpen,
          submenus: [
            {
              href: '/courses',
              label: "Kurslar ro'yxati",
              active: pathname === '/courses',
            },
            {
              href: '/add-courses',
              label: "Kurs qo'shish",
              active: pathname === '/add-courses',
            },
          ],
        },
        {
          href: '',
          label: "O'qituvchilar",
          active: pathname.includes('/teachers'),
          icon: User,
          submenus: [
            {
              href: '/teachers',
              label: "O'qituvchilar ro'yxati",
              active: pathname === '/teachers',
            },
            {
              href: '/add-teacher',
              label: "O'qituvchi qo'shish",
              active: pathname === '/add-teacher',
            },
          ],
        },
        {
          href: '',
          label: 'Guruhlar',
          active: pathname.includes('/groups'),
          icon: Users,
          submenus: [
            {
              href: '/groups',
              label: "Guruhlar ro'yxati",
              active: pathname === '/groups',
            },
            {
              href: '/add-group',
              label: "Guruhlar qo'shish",
              active: pathname === '/add-group',
            },
          ],
        },
        {
          href: '',
          label: "O'quvchilar",
          active: pathname.includes('/students'),
          icon: GraduationCapIcon,
          submenus: [
            {
              href: '/students',
              label: "O'quvchilar ro'yxati",
              active: pathname === '/students',
            },
            {
              href: '/add-student',
              label: "O'quvchilar qo'shish",
              active: pathname === '/add-student',
            },
          ],
        },
        {
          href: '/payment-history',
          label: "To'lovlar ro'yxati",
          active: pathname.includes('/payment-history'),
          icon: LayoutList,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Sozlamalar',
      menus: [
        {
          href: '/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
