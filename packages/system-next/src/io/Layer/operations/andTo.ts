import type { Erase, Spreadable } from "../../../data/Utils"
import type { Layer } from "../definition"
import { and_ } from "./and"
import { to_ } from "./to"

/**
 * Feeds the output services of this layer into the input of the specified
 * layer, resulting in a new layer with the inputs of this layer, and the
 * outputs of both layers.
 *
 * @ets operator ets/Layer >
 */
export function andTo_<
  RIn,
  E,
  ROut extends Spreadable,
  RIn2 extends Spreadable,
  E2,
  ROut2 extends Spreadable
>(
  self: Layer<RIn, E, ROut>,
  that: Layer<RIn2, E2, ROut2>
): Layer<RIn & Erase<ROut & RIn2, ROut>, E2 | E, ROut & ROut2> {
  return and_(self, to_(self, that))
}

/**
 * Feeds the output services of this layer into the input of the specified
 * layer, resulting in a new layer with the inputs of this layer, and the
 * outputs of both layers.
 *
 * @ets_data_first andTo_
 */
export function andTo<RIn2 extends Spreadable, E2, ROut2 extends Spreadable>(
  that: Layer<RIn2, E2, ROut2>
) {
  return <RIn, E, ROut extends Spreadable>(
    self: Layer<RIn, E, ROut>
  ): Layer<RIn & Erase<ROut & RIn2, ROut>, E | E2, ROut & ROut2> =>
    andTo_<RIn, E, ROut, RIn2, E2, ROut2>(self, that)
}