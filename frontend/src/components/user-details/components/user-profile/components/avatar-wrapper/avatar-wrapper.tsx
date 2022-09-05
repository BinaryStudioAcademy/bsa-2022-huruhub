import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UserWithPermissions } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import React from 'react';
import { userDetailsActions } from 'store/actions';

import styles from './styles.module.scss';

const AvatarWrapper: FC = () => {
  const { user, userDetails } = useAppSelector((state) => ({
    user: state.auth.user,
    userDetails: state.userDetails.userDetails,
  }));
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const [file = null] = e.target.files ?? [];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      dispatch(
        userDetailsActions.updateUserAvatar({
          file: formData,
          userId: (user as UserWithPermissions).id,
        }),
      );
    }
  }, [selectedFile]);

  return (
    <div className={styles.flex}>
      <div className={styles.imageWrapper}>
        <Image
          width="136"
          height="136"
          src={userDetails?.avatar?.url ?? defaultUserAvatar}
          alt="user avatar"
          isCircular
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          btnColor="blue"
          label="Update File"
          btnType="upload"
          className={styles.marginBottom}
          onFileSelect={handleFileSelect}
        />
        <Button btnColor="blue" label="Save" className={styles.btn} />
      </div>
    </div>
  );
};

export { AvatarWrapper };
