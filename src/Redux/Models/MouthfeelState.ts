import { FoodsState, VotableAttributeState } from '../Models';

export interface MouthfeelState {
    flavors: VotableAttributeState;
    foods: FoodsState;
    miscellaneous: VotableAttributeState;
    textures: VotableAttributeState;
}