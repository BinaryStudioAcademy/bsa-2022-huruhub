import { FC } from 'common/types/types';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type Category = {
  id: number;
  key: string;
  name: string;
};

type Props = {
  items: Category[];
};

const CategoriesList: FC<Props> = ({ items }) => {
  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id} className={styles.category}>
          <Category keyName={category.key} name={category.name} />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
