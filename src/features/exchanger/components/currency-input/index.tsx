import React, { FC, useState, useCallback, useRef } from 'react';
import { Currency } from '../../models';
import { usePopper } from 'react-popper';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface CurrencyInputProps {
  selected: Currency | null;
  currencies: Currency[];
  disabled?: boolean;
  onChange: (index: number) => void;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  selected,
  currencies,
  disabled,
  onChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const {
    styles: { popper },
    attributes,
  } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  const handleSelect = useCallback(() => {
    rootRef.current?.focus();
  }, [rootRef]);

  const handleChange = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const idx = parseInt(e.currentTarget.dataset.idx as string);
      onChange(idx);
      inputRef.current?.focus();
    },
    [onChange, inputRef],
  );

  return (
    <div ref={rootRef} className={styles.root} tabIndex={-1}>
      <div className={clsx(styles.currencyInput)} ref={setReferenceElement}>
        <input
          ref={inputRef}
          className={styles.input}
          type={'number'}
          inputMode={'decimal'}
          disabled={disabled}
        />
        <button
          className={styles.dropdown}
          disabled={disabled}
          onClick={handleSelect}
        >
          <p>{selected ? selected.name : 'Выберите'}</p>
        </button>
      </div>
      <div
        ref={setPopperElement}
        className={clsx(styles.popper, {
          [styles.popper_hidden]: disabled,
        })}
        style={popper}
        {...attributes.popper}
      >
        <ul className={styles.list}>
          {currencies.map((currency, index) => (
            <li key={currency.code} data-idx={index} onClick={handleChange}>
              {currency.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
