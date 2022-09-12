import React, { FC } from 'react';

import {
  CategoryGetAllItemResponseDto,
  CourseUpdateCategoryRequestDto,
} from '~/common/types/types';
import { Button, Dropdown, View } from '~/components/common/common';
import { useAppForm, useEffect } from '~/hooks/hooks';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from '~/validation-schemas/validation-schemas';

import { getCategoriesOptions } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  categories: CategoryGetAllItemResponseDto[];
  defaultCategoryId: number | undefined;
  onSave: (payload: CourseUpdateCategoryRequestDto) => void;
};

const EditCategoryDropdown: FC<Props> = ({
  categories,
  defaultCategoryId,
  onSave,
}) => {
  const categoriesOptions = getCategoriesOptions(categories);

  const { control, handleSubmit, reset, errors } =
    useAppForm<CourseUpdateCategoryRequestDto>({
      defaultValues: {},
      validationSchema: courseUpdateCategoryValidationSchema,
    });

  useEffect(() => {
    if (defaultCategoryId) {
      reset({
        newCategoryId: defaultCategoryId,
      });
    }
  }, [defaultCategoryId]);

  return (
    <>
      <Dropdown
        items={categoriesOptions}
        control={control}
        name="newCategoryId"
        errors={errors}
        placeholder="Select category"
      />
      <View style={styles.saveButtonContainer}>
        <Button label="Save" onPress={handleSubmit(onSave)} />
      </View>
    </>
  );
};

export { EditCategoryDropdown };
