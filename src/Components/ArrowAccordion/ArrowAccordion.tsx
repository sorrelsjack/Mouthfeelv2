import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../CustomText/CustomText';

interface Section {
    title: string, 
    content: JSX.Element
}

interface ArrowAccordionProps {
    sections: Section[]
}

const ArrowAccordion = (props: ArrowAccordionProps) => {
    const { sections } = props;

    const [activeSections, setActiveSections] = useState<number[]>([]);

    // _ is for index
    const renderHeader = (section: Section, _: number, isActive: boolean) => {
        return (
            <View style={styles.header}>
                <CustomText style={styles.headerText}>{section.title}</CustomText>
                <Icon name={isActive ? 'chevron-up' : 'chevron-down'} />
            </View>
        )
    }

    const renderContent = (section: Section, _: number) => {
        return (
            <View style={{ flex: 1, marginBottom: 10 }}>
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