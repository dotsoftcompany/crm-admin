import {
  User,
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
          href: '/',
          label: 'Asosiy sahifa',
          active: pathname === '/',
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
              href: '/add-course',
              label: "Kurs qo'shish",
              active: pathname === '/add-course',
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
  ];
}
