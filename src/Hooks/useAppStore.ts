import { TypedUseSelectorHook, useSelector } from "react-redux"
import { MouthfeelState } from "../Redux/Models"

export const useAppStore: TypedUseSelectorHook<MouthfeelState> = useSelector;