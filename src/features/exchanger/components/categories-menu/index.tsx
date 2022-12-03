import React, { FC, useCallback } from 'react';
import { Category, AvailableCategories } from '../../models';
import styles from './styles.module.scss';
import clsx from 'clsx';

const categories = ['Криптовалюты', 'Банки', 'Наличные'];

interface CategoriesMenuProps {
  selected: Category | null;
  available: AvailableCategories;
  disabled?: boolean;
  onChange: (category: Category | null) => void;
}

export const CategoriesMenu: FC<CategoriesMenuProps> = ({
  selected,
  available,
  disabled,
  onChange,
}) => {
  const handleChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const idx = parseInt(e.currentTarget.dataset.idx as string);

      if (idx === -1) onChange(null);
      else onChange(idx as Category);
    },
    [onChange],
  );

  return (
    <div className={styles.menu}>
      <MenuItem
        idx={-1}
        selected={selected === null}
        disabled={disabled}
        onClick={handleChange}
      >
        Все
      </MenuItem>
      {/* Массив не изменяется, можно использовать index в key */}
      {categories.map((value, index) => (
        <MenuItem
          key={index}
          idx={index}
          selected={selected === index}
          disabled={!available[index] || disabled}
          onClick={handleChange}
        >
          {value}
        </MenuItem>
      ))}
    </div>
  );
};

interface MenuItemProps {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  idx: number;
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  onClick,
  idx,
  disabled,
  selected,
}) => {
  return (
    <div
      className={clsx(styles.item, {
        [styles.item_selected]: selected,
        [styles.item_disabled]: disabled,
      })}
      onClick={onClick}
      data-idx={idx}
    >
      {children}
    </div>
  );
};
