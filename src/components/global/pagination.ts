type GetPaginationButtons = (options: {
  totalPages: number;
  buttonsAmount: number;
  currentPage: number;
}) => number[];

/**
 *
 * Returns an array of numbers to be used as pagination buttons
 * @param - represents the maximum number of buttons to be displayed
 *
 * @example
 * ```ts
 * getPaginationButtons({ totalPages: 10, maxPaginationButtons: 5, currentPage: 3 }); // Output: [1, 2, 3, 4, 5]
 * getPaginationButtons({ totalPages: 10, maxPaginationButtons: 5, currentPage: 8 }); // Output: [6, 7, 8, 9, 10]
 * ```
 */
export const getPaginationButtons: GetPaginationButtons = ({
  totalPages,
  buttonsAmount,
  currentPage,
}) => {
  let max = totalPages > buttonsAmount ? buttonsAmount : totalPages;
  if (totalPages <= buttonsAmount) max = totalPages;

  const half = Math.floor(max / 2);
  let to = max;

  if (currentPage + half >= totalPages) {
    to = totalPages;
  } else if (currentPage > half) {
    to = currentPage + half;
  }
  const from = to - max;

  const arr = Array.from({ length: max }, (_, i) => from + i + 1);
  return arr;
};
