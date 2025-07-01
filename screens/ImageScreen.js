import { FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Bubble from '../components/Bubble';
import CustomHeaderButton from '../components/CustomHeaderButton';
import InputContainer from '../components/InputContainer';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';
import { resetConversation } from '../utils/conversationHistoryUtil';
import { makeImageRequest } from '../utils/gptUtils';

export default function ImageScreen(props) {
  const flatlist = useRef();

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]); // array of {type, content}
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Clear"
            iconName="trash-o"
            onPress={() => {
              setConversation([]);
              resetConversation();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    resetConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;

    const userMessage = { type: "user", content: messageText };
    const tempConversation = [...conversation, userMessage];

    try {
      setLoading(true);
      setMessageText("");
      setConversation(tempConversation);

      const responseData = await makeImageRequest(messageText);
      // responseData expected as array of { type: "text" | "image", content: string }

      setConversation([...tempConversation, ...responseData]);
    } catch (error) {
      console.log(error);
      setMessageText(messageText);
    } finally {
      setLoading(false);
    }
  }, [messageText, conversation]);

  const renderItem = ({ item }) => {
    if (item.type === "user") {
      return <Bubble text={item.content} type="user" />;
    } else if (item.type === "text") {
      return <Bubble text={item.content} type="assistant" />;
    } else if (item.type === "image") {
      return (
        <Image
          style={{ marginBottom: 10, height: 256, width: 256 }}
          source={{ uri: item.content }}
        />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {!loading && conversation.length === 0 && (
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="lightbulb" size={48} color={colors.lightGrey} />
              <Text style={styles.emptyContainerText}>Type a message to get started!</Text>
            </View>
          )}

          {conversation.length !== 0 && (
            <FlatList
              ref={(ref) => (flatlist.current = ref)}
              onLayout={() => flatlist.current?.scrollToEnd()}
              onContentSizeChange={() => flatlist.current?.scrollToEnd()}
              style={styles.flatList}
              data={conversation}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <Bubble type="loading" />
            </View>
          )}
        </View>

        <InputContainer
          onChangeText={setMessageText}
          value={messageText}
          onPress={sendMessage}
          placeholder="Describe your image..."
        />
      </View>
    </KeyboardAvoidingViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
  messagesContainer: {
    flex: 1,
  },
  flatList: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainerText: {
    marginTop: 10,
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: "regular",
  },
});
