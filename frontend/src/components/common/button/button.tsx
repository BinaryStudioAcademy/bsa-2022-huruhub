import { AppRoute } from 'common/enums/enums';
import { FC, IconName } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import React, { ReactElement } from 'react';

import { Icon, Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  hasVisuallyHiddenLabel?: boolean;
  btnColor?: 'blue' | 'gray' | 'red';
  type?: 'button' | 'submit';
  btnType?: 'filled' | 'outlined' | 'upload' | 'icon';
  to?: AppRoute;
  className?: string;
  onClick?: (evt: React.MouseEvent) => void;
  iconName?: IconName;
  iconColor?: 'blue' | 'gray';
  onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Button: FC<Props> = ({
  btnType = 'filled',
  hasVisuallyHiddenLabel = false,
  type = 'button',
  btnColor,
  label,
  to,
  onClick,
  className,
  iconName,
  iconColor = 'gray',
  onFileSelect,
}) => {
  const isLink = Boolean(to);

  const getContent = (): ReactElement | string => {
    const hasIcon = Boolean(iconName);

    return (
      <>
        {hasIcon && (
          <Icon
            name={iconName as IconName}
            className={styles[`icon-${iconColor}`]}
          />
        )}

        <span
          className={getValidClasses(
            hasVisuallyHiddenLabel && 'visually-hidden',
          )}
        >
          {label}
        </span>
      </>
    );
  };

  if (isLink) {
    return (
      <Link
        to={to as AppRoute}
        className={getValidClasses(
          styles.button,
          styles[`button-${btnColor}`],
          styles[`button-${btnType}`],
        )}
      >
        {getContent()}
      </Link>
    );
  }

  if (btnType === 'upload') {
    return (
      <label
        className={getValidClasses(
          styles.button,
          styles[`button-${btnColor}`],
          styles[`button-${btnType}`],
        )}
      >
        <input
          type="file"
          onChange={onFileSelect}
          className={styles.fileInput}
        />
        {label}
      </label>
    );
  }

  return (
    <button
      type={type}
      className={getValidClasses(
        className,
        styles.button,
        styles[`button-${btnColor}`],
        styles[`button-${btnType}`],
      )}
      onClick={onClick}
    >
      {getContent()}
    </button>
  );
};

export { Button, Props };
