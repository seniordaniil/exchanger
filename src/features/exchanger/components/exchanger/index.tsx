import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  IExchanger,
  fromCurrenciesSelector,
  toCurrenciesSelector,
  isToAvailableSelector,
  selectExchanger,
  fromAvailableCategoriesSelector,
  toAvailableCategoriesSelector,
  changeToCategory,
  Category,
} from '../../models';
import { Title } from '../../ui/title';
import { CategoriesMenu } from '../categories-menu';

export const Exchanger: FC = () => {
  const exchanger = useSelector<RootState, IExchanger>(selectExchanger);

  const fromCurrencies = fromCurrenciesSelector(exchanger);
  const toCurrencies = toCurrenciesSelector(exchanger);
  const isToAvailable = isToAvailableSelector(exchanger);

  const { from, fromCategory, to, toCategory } = exchanger;

  const fromAvailableCategories = fromAvailableCategoriesSelector(exchanger);
  const toAvailableCategories = toAvailableCategoriesSelector(from);

  const dispatch = useDispatch();

  const handleChangeFromCategory = useCallback(
    (category: Category | null) => {
      dispatch(changeToCategory(category));
    },
    [dispatch],
  );

  const handleChangeToCategory = useCallback(
    (category: Category | null) => {
      dispatch(changeToCategory(category));
    },
    [dispatch],
  );

  return (
    <div>
      <Title>Отдаете</Title>
      <CategoriesMenu
        selected={fromCategory}
        available={fromAvailableCategories}
        onChange={handleChangeFromCategory}
      />
    </div>
  );
};
