import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Linking
} from 'react-native';
import { InputField, Button } from '../../Components';
import { ThemeProp } from '../../Models';
import { withTheme } from 'react-native-elements';
import { CONTACT_US_EMAIL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ContactUsScreenProps {
    theme: ThemeProp;
}

// TODO: Would be cool if we could include attachments or attach a stack trace
const ContactUsScreen = (props: ContactUsScreenProps) => {
    const { theme } = props;

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const styles = createStyles(theme);

    const onSendPressed = () => {
        Linking.openURL(`mailto:${CONTACT_US_EMAIL}?subject=${subject}&body=${message}`)
    }

    const handleAttachPressed = () => {
        console.log('This needs to be implemented.');
    }

    // TODO: Register an email for this apps emails to go to

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            contentInsetAdjustmentBehavior="automatic">
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Text style={{ marginBottom: 20 }}>Have a problem? A suggestion? Tell us about it here!</Text>
                <View>
                    <InputField
                        containerStyle={styles.input}
                        icon='user'
                        placeholder='Name'
                        textPosition='center'
                        value={name}
                        onTextChange={setName} />
                    <InputField
                        containerStyle={styles.input}
                        icon='envelope'
                        placeholder='Subject'
                        textPosition='center'
                        value={subject}
                        onTextChange={setSubject} />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <TouchableOpacity onPress={handleAttachPressed} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon size={13} name='paperclip' />
                        <Text style={{ marginLeft: 7, fontSize: 13 }}>Attach An Image</Text>
                    </TouchableOpacity>
                    <InputField containerStyle={[styles.input, { flexGrow: 1 }]} placeholder='Your Message' multiline value={message} onTextChange={setMessage} />
                </View>
                <Button
                    style={styles.button}
                    onPress={onSendPressed}
                    text='Send Message' />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default withTheme(ContactUsScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        flexShrink: 1,
        height: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: theme.primaryThemeColor,
        padding: 15,
        marginTop: 20
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: theme.halfTransparent
    }
})