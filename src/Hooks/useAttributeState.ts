import { useSelector } from 'react-redux'
import { MouthfeelState } from '../Redux/Models'
import { AttributeType } from '../Models'

export const useAttributeState = (attributeType: AttributeType) => {
    return useSelector((state: MouthfeelState) => {
        switch (attributeType) {
            case 'flavor': return state.flavors.all
            case 'texture': return state.textures.all
            case 'miscellaneous': return state.miscellaneous.all
            default: return null
        }
    })
}