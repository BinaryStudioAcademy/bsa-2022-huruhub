import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Content, Image } from 'components/common/common';
import { getFormattedDate } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  note: string;
  authorName: string;
  postDate: string;
};

const InterviewNoteCard: FC<Props> = ({ note, authorName, postDate }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <Content html={note} />
        <div className={styles.postDateSection}>
          <div>{getFormattedDate(postDate, 'HH:mm, dd.MM')}</div>
        </div>
      </div>
      <div className={styles.cardAuthorSection}>
        <Image
          width="30px"
          height="30px"
          src={defaultAvatar}
          alt="Author avatar"
          isCircular
        />
        <div className={styles.authorNameSection}>{authorName}</div>
      </div>
    </div>
  );
};

export { InterviewNoteCard };
