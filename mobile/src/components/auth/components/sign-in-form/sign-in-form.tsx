import React, { FC } from 'react';

import { UserSignInRequestDto } from '~/common/types/types';
import { Button, Input, Text, View } from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { userSignIn as userSignInValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_SIGN_IN_PAYLOAD } from './common/constants';
import { styles } from './styles';

type Props = {
  onSubmit: () => void;
};

const SignInForm: FC<Props> = () => {
  const { control, errors } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  return (
    <>
      <Text style={styles.title}>Sign in</Text>
      <View>
        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            placeholder="Enter your email"
            name="email"
            control={control}
            errors={errors}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Password"
            placeholder="Enter your password"
            name="password"
            control={control}
            errors={errors}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            label="Sign in"
            onPress={(): void => {
              // TODO: handle press
            }}
          />
        </View>
      </View>
    </>
  );
};

export { SignInForm };
