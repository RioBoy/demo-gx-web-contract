const Signature = ({
  signatureRef,
  extraClass = '',
  isEmptyCanvas = true,
  isLoading = false,
  actions = {
    clear: () => {},
  },
}) => {
  return (
    <div className={'wp-signature ' + extraClass}>
      <canvas ref={signatureRef} className="signature-canvas"></canvas>

      {isEmptyCanvas ? (
        <div className="canvas-placeholder mobile-fs-24">Draw Signature</div>
      ) : null}

      <button
        type="button"
        className="btn btn-primary position-absolute bottom-3 end-3"
        onClick={actions.clear}
        disabled={isLoading}
      >
        Clear
      </button>
    </div>
  );
};

export default Signature;
