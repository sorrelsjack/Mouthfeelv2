import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ArrowAccordionProps {
    sections: { title: string, content: JSX.Element }[]
}

const ArrowAccordion = (props: ArrowAccordionProps) => {
    const { sections } = props;

    const [activeSections, setActiveSections] = useState([]);

    const renderHeader = (section, _, isActive: boolean) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
                <Icon name={isActive ? 'chevron-up' : 'chevron-down'} />
            </View>
        )
    }

    const renderContent = (section, _, isActive: boolean) => {
        return (
            <View style={{ marginBottom: 10 }}>
                {section.content}
            </View>
        )
    }

    return (
        <>
            <Accordion
                expandMultiple
                duration={200}
                underlayColor='transparent'
                activeSections={activeSections}
                sections={sections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={setActiveSections} />
        </>
    )
}

export default ArrowAccordion;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'rgba(0, 0, 0, .4)',
        borderBottomWidth: 1
    },
    headerText: {
        marginTop: 10,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});