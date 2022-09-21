import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { UsersGetResponseDto } from '~/common/types/types';
import { OPPONENT_MESSAGE_SHORT_LENGTH } from '~/components/chat/common/constants/constants';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  chatId: string;
  currentUserId: number;
  messageSenderId: number;
  chatOpponent: UsersGetResponseDto;
  lastMessage?: string;
  lastMessageDate?: string;
  onPress: (chatId: string, chatOpponent: UsersGetResponseDto) => void;
};

const Conversation: FC<Props> = ({
  chatId,
  currentUserId,
  messageSenderId,
  chatOpponent,
  lastMessage,
  lastMessageDate,
  onPress,
}) => {
  const messageStart = messageSenderId === currentUserId ? 'You: ' : '';
  const messageRows = lastMessage?.split('\n');
  const messageFirstRow = messageRows?.length ? messageRows[0] : '';
  const isMessageCut =
    (messageRows && messageRows.length > 1) ||
    messageFirstRow.length > OPPONENT_MESSAGE_SHORT_LENGTH;
  const message = `${messageStart}${messageFirstRow.slice(
    0,
    OPPONENT_MESSAGE_SHORT_LENGTH,
  )}${isMessageCut ? '...' : ''}`;

  const messageDate =
    lastMessageDate && getFormattedDate(lastMessageDate, 'HH:mm');

  const handleChatSelect = (): void => {
    onPress(chatId, chatOpponent);
  };

  return (
    <Pressable style={styles.container} onPress={handleChatSelect}>
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri:
              chatOpponent.userDetails.avatar?.url ??
              getImageUri(defaultAvatar),
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.opponentName}>
          {chatOpponent.userDetails.fullName}
        </Text>
        {lastMessageDate && (
          <Text style={styles.opponentMessage}>{message}</Text>
        )}
      </View>
      {messageDate && <Text style={styles.date}>{messageDate}</Text>}
    </Pressable>
  );
};

export { Conversation };
