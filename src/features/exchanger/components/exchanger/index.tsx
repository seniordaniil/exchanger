import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  IExchanger,
  fromCurrenciesSelector,
  toCurrenciesSelector,
  isToAvailableSelector,
  selectExchanger,
} from '../../models';

export const Exchanger: FC = () => {
  const exchanger = useSelector<RootState, IExchanger>(selectExchanger);

  const fromCurrencies = fromCurrenciesSelector(exchanger);
  const toCurrencies = toCurrenciesSelector(exchanger);
  const isToAvailable = isToAvailableSelector(exchanger);

  const { from, to } = exchanger;

  return <></>;
};
