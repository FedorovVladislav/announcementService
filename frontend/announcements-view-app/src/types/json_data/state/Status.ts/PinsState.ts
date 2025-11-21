import {DigitState} from "@/types/json_data/state/Status.ts/DigitalState.ts";

export interface PinsState {
    d_output: [DigitState],
    d_input: [DigitState],
    a_output: DigitState,
    a_input: DigitState,
    cl_input: DigitState
}