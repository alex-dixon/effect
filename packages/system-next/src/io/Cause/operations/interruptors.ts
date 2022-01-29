import * as HS from "../../../collection/immutable/HashSet"
import * as O from "../../../data/Option/core"
import type { FiberId } from "../../FiberId/definition"
import type { Cause } from "../definition"
import { isInterruptType } from "../definition"
import { reduceLeft_ } from "./reduceLeft"

/**
 * Returns a set of interruptors, fibers that interrupted the fiber described
 * by this `Cause`.
 */
export function interruptors<E>(self: Cause<E>): HS.HashSet<FiberId> {
  return reduceLeft_(self, HS.make<FiberId>(), (acc, curr) =>
    isInterruptType(curr) ? O.some(HS.add_(acc, curr.fiberId)) : O.some(acc)
  )
}