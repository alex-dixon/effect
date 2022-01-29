import type * as Tp from "../../../collection/immutable/Tuple"
import * as E from "../../../data/Either"
import * as O from "../../../data/Option"
import type { Trace } from "../../../io/Trace"
import { failureTraceOrCause } from "../../Cause"
import type { Effect } from "../definition"
import { failCause } from "./failCause"
import { foldCauseEffect_ } from "./foldCauseEffect"
import { succeedNow } from "./succeedNow"

/**
 * A version of `catchSome` that gives you the trace of the error.
 *
 * @ets fluent ets/Effect catchSomeTrace
 */
export function catchSomeTrace_<R, E, A, R2, E2, A2>(
  self: Effect<R, E, A>,
  f: (tuple: Tp.Tuple<[E, Trace]>) => O.Option<Effect<R2, E2, A2>>,
  __etsTrace?: string
): Effect<R & R2, E | E2, A | A2> {
  return foldCauseEffect_(
    self,
    (cause): Effect<R2, E | E2, A2> =>
      E.fold_(
        failureTraceOrCause(cause),
        (tuple) => O.getOrElse_(f(tuple), () => failCause(cause)),
        failCause
      ),
    succeedNow,
    __etsTrace
  )
}

/**
 * A version of `catchSome` that gives you the trace of the error.
 */
export function catchSomeTrace<E, R2, E2, A2>(
  f: (tuple: Tp.Tuple<[E, Trace]>) => O.Option<Effect<R2, E2, A2>>,
  __etsTrace?: string
) {
  return <R, A>(self: Effect<R, E, A>): Effect<R & R2, E | E2, A | A2> =>
    catchSomeTrace_(self, f, __etsTrace)
}