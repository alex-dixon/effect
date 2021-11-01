// ets_tracing: off

import type * as CK from "../../../../Collections/Immutable/Chunk"
import * as Q from "../../../../Queue"
import * as CH from "../../Channel"
import * as TK from "../../Take"
import * as C from "../core"
import * as ToQueue from "./toQueue"

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 */
export function bufferChunks_<R, E, A>(
  self: C.Stream<R, E, A>,
  capacity: number
): C.Stream<R, E, A> {
  const queue = ToQueue.toQueue_(self, capacity)

  return new C.Stream(
    CH.managed_(queue, (queue) => {
      const process: CH.Channel<
        unknown,
        unknown,
        unknown,
        unknown,
        E,
        CK.Chunk<A>,
        void
      > = CH.chain_(CH.fromEffect(Q.take(queue)), (take) =>
        TK.fold_(
          take,
          CH.end(undefined),
          (error) => CH.failCause(error),
          (value) => CH.zipRight_(CH.write(value), process)
        )
      )

      return process
    })
  )
}

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @ets_data_first bufferChunks_
 */
export function bufferChunks(capacity: number) {
  return <R, E, A>(self: C.Stream<R, E, A>) => bufferChunks_(self, capacity)
}