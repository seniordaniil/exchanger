import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store';
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
  changeFromCategory,
  fetchFilter,
  changeFrom,
  changeTo,
} from '../../models';
import { Wrapper } from '../../ui';
import { Direction } from '../direction';
import { CategoriesMenu } from '../categories-menu';
import { CurrencyInput } from '../currency-input';

export const Exchanger: FC = () => {
  const exchanger = useSelector<RootState, IExchanger>(selectExchanger);

  const fromCurrencies = fromCurrenciesSelector(exchanger);
  const toCurrencies = toCurrenciesSelector(exchanger);
  const isToAvailable = isToAvailableSelector(exchanger);

  const { from, fromCategory, to, toCategory } = exchanger;

  const fromAvailableCategories = fromAvailableCategoriesSelector(exchanger);
  const toAvailableCategories = toAvailableCategoriesSelector(from);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFilter());
  }, [dispatch]);

  const handleChangeFromCategory = useCallback(
    (category: Category | null) => {
      dispatch(changeFromCategory(category));
    },
    [dispatch],
  );

  const handleChangeToCategory = useCallback(
    (category: Category | null) => {
      dispatch(changeToCategory(category));
    },
    [dispatch],
  );

  const handleChangeFrom = useCallback(
    (index: number) => {
      dispatch(changeFrom(fromCurrencies[index]));
    },
    [dispatch, fromCurrencies],
  );

  const handleChangeTo = useCallback(
    (index: number) => {
      dispatch(changeTo(toCurrencies[index]));
    },
    [dispatch, toCurrencies],
  );

  const fromCurrenciesMapped = useMemo(
    () => fromCurrencies.map(({ from }) => from),
    [fromCurrencies],
  );

  return (
    <Wrapper>
      <Direction title={'Отдаете'}>
        <CategoriesMenu
          selected={fromCategory}
          available={fromAvailableCategories}
          onChange={handleChangeFromCategory}
        />
        <CurrencyInput
          selected={from?.from || null}
          currencies={fromCurrenciesMapped}
          onChange={handleChangeFrom}
        />
      </Direction>
      <Direction title={'Получаете'}>
        <CategoriesMenu
          disabled={!isToAvailable}
          selected={toCategory}
          available={toAvailableCategories}
          onChange={handleChangeToCategory}
        />
        <CurrencyInput
          disabled={!isToAvailable}
          selected={to}
          currencies={toCurrencies}
          onChange={handleChangeTo}
        />
      </Direction>
    </Wrapper>
  );
};
