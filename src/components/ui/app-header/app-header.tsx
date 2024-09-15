import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { TAppHeaderUIProps } from './type';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from './app-header.module.css';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const isConstructorPage = location.pathname === '/';
  const isFeedPage = location.pathname === '/feed';
  const isProfilePage = location.pathname === '/profile';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon type={isConstructorPage ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon type={isFeedPage ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>

        <NavLink to='/' className={styles.link}>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
        </NavLink>

        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `${
              styles.link
            } ${isActive ? styles.link_active : ''} ${styles.link_position_last}`
          }
        >
          <ProfileIcon type={isProfilePage ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
