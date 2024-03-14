import bootstrap from 'bootstrap/dist/js/bootstrap';

export default function actionModal(idName, hidden = false, zIndex = 1005) {
  const modal = document.getElementById(idName);

  if (!modal) {
    return;
  }

  if (hidden) {
    const bootstrapModalClose = bootstrap.Modal.getInstance(modal);
    bootstrapModalClose.hide();
  } else {
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    const modalBackdrop = document.querySelector('.modal-backdrop.show');

    if (modalBackdrop) {
      modalBackdrop.style.zIndex = zIndex;
    }
  }
}
