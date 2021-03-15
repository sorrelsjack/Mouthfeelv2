import { CommentsState, FoodsState, VotableAttributeState, UserState } from '../Models';

export interface MouthfeelState {
    comments: CommentsState;
    flavors: VotableAttributeState;
    foods: FoodsState;
    miscellaneous: VotableAttributeState;
    textures: VotableAttributeState;
    user: UserState;
}