export type DialogEvent = CustomEvent<{ id: string }>;

declare global {
  interface DocumentEventMap {
    "dialog-open": DialogEvent;
    "dialog-close": DialogEvent;
  }
}

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
