import { FoodsState, VotableAttributeState, UserState } from '../Models';

export interface MouthfeelState {
    flavors: VotableAttributeState;
    foods: FoodsState;
    miscellaneous: VotableAttributeState;
    textures: VotableAttributeState;
    user: UserState;
}