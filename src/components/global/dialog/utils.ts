export function openDialog(dialogId: string) {
  document.dispatchEvent(
    new CustomEvent("dialog-open", {
      detail: { id: dialogId },
    }),
  );
}

export function closeDialog(dialogId: string) {
  document.dispatchEvent(
    new CustomEvent("dialog-close", {
      detail: { id: dialogId },
    }),
  );
}
