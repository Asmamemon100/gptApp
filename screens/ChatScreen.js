/*import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Bubble from '../components/Bubble';
import CustomHeaderButton from '../components/CustomHeaderButton';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from './constants/colors';
import { addUserMessage, getConversation, resetConversation } from './utils/conversationHistoryUtil';
import { makeChatRequest } from './utils/gptUtils';


export default function ChatScreen(props){

    const flatListRef = useRef();

    const [messageText, setMessageText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [Loading, setLoading] = useState(false);


    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Clear'
                    iconName='trash-o'
                    onPress={() => {
                        setConversation([]);
                        resetConversation();
                    }}
                />

            </HeaderButtons>
            })

    }, []);
    

    useEffect(() => {
        resetConversation();
        setConversation([]);
    }, []);

    const sendMessage = useCallback(async () => {
        if (messageText === "") return;

        try {
            setLoading(true);
            addUserMessage(messageText);
            setMessageText("");
            setConversation([ ...getConversation() ]);

            await makeChatRequest();
            
        }
        catch(error) {
            console.log(error);
        }
        finally{
            setConversation([ ...getConversation() ]);
            setLoading(false);
        }

        
    }, [messageText]);


return (

        <KeyboardAvoidingViewContainer>

             <View style={styles.container}>

            <View style ={styles.messagesContainer}>

                {
                    !Loading && conversation.length=== 0 &&
                    <View style={styles.emptyContainer}>

                        <FontAwesome5 name="lightbulb" size={48} color={colors.lightGrey} />
                        <Text style={styles.emptyContainerText}>type message to get started!</Text>
                    </View>
                }
                {
                    conversation.length  !== 0 &&
                <FlatList
                    ref={flatListRef}
                    onLayout={() => flatListRef.current.scrollToEnd()}
                    onContentSizeChange={() =>  flatListRef.current.scrollToEnd()}
                    style={styles.flatList}
                    data={conversation}
                    renderItem={(itemData) => {
                        const convoItem = itemData.item;

                        const { role, content} = convoItem;

                        if(role=="system") return null;
                        return <Bubble
                            text={content}
                            type={role}
                        />
                    }}
                    

                />
             }

            {Loading && 
            <View style ={styles.loadingContainer}>
                <Bubble
                    type="loading"

                />

            </View>
            }
            </View>

             <View style={styles.inputContainer}>
        

        <TextInput 
            style={styles.textbox}
            placeholder="Type a message"
            onChangeText={(text)=> setMessageText(text)}
            value={messageText}
        /> 


        <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
        >    
            <Feather name="send" size={18} color="white" />
        </TouchableOpacity>

        </View>
    </View>
    </KeyboardAvoidingViewContainer>
    
);
}

const styles = StyleSheet.create({
    container: {

    flex: 1,
    backgroundColor: colors.greyBg, 
    },

    inputContainer: {
    flexDirection: 'row',
    backgroundColor: "white",
    padding:10
},

sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
},

textbox:  {
    flex: 1,
    fontFamily: "regular"
},
messagesContainer: {
flex: 1,
},
flatList: {
    marginHorizontal: 15,
    paddingVertical: 10
},
loadingContainer:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
},
loadingGif: {
    height: 100
    
},
emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
},
emptyContainerText: {
    marginTop: 10,
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: 'regular'
    
}
});

*/

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Bubble from '../components/Bubble';
import CustomHeaderButton from '../components/CustomHeaderButton';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';
import { addUserMessage, getConversation, resetConversation } from '../utils/conversationHistoryUtil';
import { makeChatRequest } from '../utils/gptUtils';

export default function ChatScreen(props) {

  const flatlist = useRef();

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Clear'
          iconName='trash-o'
          onPress={() => {
            setConversation([]);
            resetConversation();
          }}
        />
      </HeaderButtons>
    })
  }, []);

  useEffect(() => {
    resetConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => { 
    if (messageText === "") return;

    try {
      setLoading(true);
      addUserMessage(messageText);
      setMessageText("");
      setConversation([ ...getConversation() ]);
      
      await makeChatRequest();
    } catch (error) {
      console.log(error);
    }
    finally {
      setConversation([ ...getConversation() ]);
      setLoading(false);
    }
    
  }, [messageText]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
          
          <View style={styles.messagesContainer}>


            {
              !loading && conversation.length === 0 &&
              <View style={styles.emptyContainer}>
                <FontAwesome5 name="lightbulb" size={48} color={colors.lightGrey} />
                <Text style={styles.emptyContainerText}>Type a message to get started!</Text>
              </View>
            }


            {
              conversation.length !== 0 &&
              <FlatList
                ref={(ref) => flatlist.current = ref}
                onLayout={() => flatlist.current.scrollToEnd()}
                onContentSizeChange={() => flatlist.current.scrollToEnd()}
                style={styles.flatList}
                data={conversation}
                renderItem={(itemData) => {
                  const convoItem = itemData.item;

                  const { role, content } = convoItem;

                  if (role === "system") return null;

                  return <Bubble
                      text={content}
                      type={role}
                    />
                }}
              />
            }
            
          

            {
              loading &&
              <View style={styles.loadingContainer}>
                <Bubble
                  type="loading"
                />
              </View>
            }

          </View>

          <View style={styles.inputContainer}>

            <TextInput
              style={styles.textbox}
              placeholder="Type a message..."
              onChangeText={(text) => setMessageText(text)}
              value={messageText}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessage}>
              <Feather name="send" size={18} color="white" />
            </TouchableOpacity>

          </View>

      </View>
    </KeyboardAvoidingViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textbox: {
    flex: 1,
    fontFamily: 'regular'
  },
  messagesContainer: {
    flex: 1,
  },
  flatList: {
    marginHorizontal: 15,
    paddingVertical: 10
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContainerText: {
    marginTop: 10,
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: 'regular'
  }
});
