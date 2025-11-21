
import {DigitState} from "@/types/json_data/state/Status.ts/DigitalState.ts";

export interface Pins {
    d_output : [DigitState] | undefined,
    d_input : [DigitState] | undefined,
    a_output: DigitState | undefined,
    a_input: DigitState | undefined,
    cl_input: DigitState | undefined
}