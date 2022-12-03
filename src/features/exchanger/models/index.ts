import { createReducer, createAction, createSelector } from '@reduxjs/toolkit';

export type Category = 0 | 1 | 2;

const categories = [
  ['BTC', 'ETH', 'USDTTRC'],
  ['ACRUB', 'SBERRUB', 'TCSBRUB'],
  ['CASHUSD', 'CASHRUB'],
];

interface Currency {
  code: string;
  name: string;
}

interface Filter {
  from: Currency;
  to: Currency[];
}

export interface IExchanger {
  fromCategory: Category | null;
  from: Filter | null;
  toCategory: Category | null;
  to: Currency | null;
  filter: Filter[];
}

export const changeFromCategory = createAction<Category | null>(
  'changeFromCategory',
);
export const changeFrom = createAction<Filter>('changeFrom');

export const changeToCategory = createAction<Category | null>(
  'changeToCategory',
);
export const changeTo = createAction<Currency>('changeTo');

export const changeFilter = createAction<Filter[]>('changeFilter');

export const exchanger = createReducer<IExchanger>(
  {
    fromCategory: null,
    from: null,
    toCategory: null,
    to: null,
    filter: [],
  },
  (builder) =>
    builder
      .addCase(changeFilter, (state, action) => {
        state.filter = action.payload;
      })
      .addCase(changeFromCategory, (state, action) => {
        state.fromCategory = action.payload;
        state.from = null;
        state.toCategory = null;
        state.to = null;
      })
      .addCase(changeFrom, (state, action) => {
        state.from = action.payload;
        state.toCategory = null;
        state.to = null;
      })
      .addCase(changeToCategory, (state, action) => {
        state.toCategory = action.payload;
        state.to = null;
      })
      .addCase(changeTo, (state, action) => {
        state.to = action.payload;
      }),
);

interface RootState {
  exchanger: IExchanger;
}

export const selectExchanger = (state: RootState) => state.exchanger;

const selectSelf = (state: IExchanger) => state;

export const fromCurrenciesSelector = createSelector(selectSelf, (state) => {
  if (state.fromCategory === null) return state.filter;

  return state.filter.filter(({ from }) =>
    categories[state.fromCategory!].includes(from.code),
  );
});

export const toCurrenciesSelector = createSelector(selectSelf, (state) => {
  if (!state.from) return [];
  if (state.toCategory === null) return state.from.to;

  return state.from.to.filter(({ code }) =>
    categories[state.toCategory!].includes(code),
  );
});

export const isToAvailableSelector = createSelector(selectSelf, (state) =>
  Boolean(state.from),
);

export type AvailableCategories = Record<number, boolean>;

export const fromAvailableCategoriesSelector = createSelector(
  selectSelf,
  (state) =>
    categories.reduce<AvailableCategories>(
      (previousValue, currentValue, currentIndex) => {
        for (const currency of currentValue) {
          if (state.filter.find(({ from }) => from.code === currency)) {
            previousValue[currentIndex] = true;
            break;
          }
        }

        return previousValue;
      },
      {},
    ),
);

export const toAvailableCategoriesSelector = createSelector(
  (filter: Filter | null) => filter,
  (filter) =>
    !filter
      ? {}
      : categories.reduce<AvailableCategories>(
          (previousValue, currentValue, currentIndex, array) => {
            for (const currency of currentValue) {
              if (filter.to.find(({ code }) => code === currency)) {
                previousValue[currentIndex] = true;
                break;
              }
            }

            return previousValue;
          },
          {},
        ),
);
