import { identity } from "../../../data/Function"
import { some } from "../../../data/Option"
import type { Effect } from "../definition"
import { unrefineWith_ } from "./unrefineWith"

/**
 * Unearth the unchecked failure of the effect (opposite of `orDie`).
 *
 * @ets fluent ets/Effect resurrect
 */
export function resurrect<R, E, A>(
  self: Effect<R, E, A>,
  __etsTrace?: string
): Effect<R, unknown, A> {
  return unrefineWith_(self, some, identity, __etsTrace)
}