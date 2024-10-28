type Bucket = {
  count: number;
  refilledAt: number;
};

/**
 * Creates a refilling token bucket rate limiter.
 *
 * This rate limiter allows a certain number of requests (tokens) per key within a specified interval.
 * Each key is associated with a "bucket" that refills over time, up to the maximum token count.
 *
 * @example
 * // Create a rate limiter allowing 3 requests per 10 seconds for each key
 * const ipBucket = createRefillingTokenBucket(3, 10);
 *
 * const clientIP = "192.168.1.1";
 *
 * if (ipBucket.check(clientIP, 1)) {
 *   // If there are enough tokens, consume one and proceed
 *   ipBucket.consume(clientIP, 1);
 *   console.log("Request allowed");
 * } else {
 *   console.log("Too many requests");
 * }
 */
export function createRefillingTokenBucket(
  maxTokens: number,
  refillIntervalSeconds: number,
) {
  const storage = new Map<string, Bucket>();

  /**
   * Calculates the number of tokens to refill based on the last refill time.
   */
  function getRefillAmount(lastRefillTime: number): number {
    const now = Date.now();
    return Math.floor((now - lastRefillTime) / (refillIntervalSeconds * 1000));
  }

  /**
   * Checks if there are enough tokens for the given key without consuming them.
   */
  function check(key: string, cost: number): boolean {
    const bucket = storage.get(key);
    if (!bucket) {
      return true; // Allow if no bucket exists yet
    }

    const refillAmount = getRefillAmount(bucket.refilledAt);
    const availableTokens = Math.min(bucket.count + refillAmount, maxTokens);

    return availableTokens >= cost;
  }

  /**
   * Consumes tokens for the given key if available.
   * If there are not enough tokens, denies the request.
   */
  function consume(key: string, cost: number): boolean {
    let bucket = storage.get(key);
    const now = Date.now();

    if (!bucket) {
      // Create a new bucket if it doesn't exist and allow the request
      bucket = {
        count: maxTokens - cost,
        refilledAt: now,
      };
      storage.set(key, bucket);
      return true;
    }

    const refillAmount = getRefillAmount(bucket.refilledAt);
    bucket.count = Math.min(bucket.count + refillAmount, maxTokens);
    bucket.refilledAt = now;

    if (bucket.count < cost) {
      return false; // Deny request if not enough tokens
    }

    bucket.count -= cost; // Deduct tokens for the request
    storage.set(key, bucket);
    return true;
  }

  return {
    check,
    consume,
  };
}

export const ipBucket = createRefillingTokenBucket(3, 10);
