const LoadingNotAvailable = ({
  isLoading,
  config = {},
  notAvailableTitle = '',
}) => {
  const { isCard = true, extraClass = '' } = config;
  return (
    <>
      <div
        className={
          'w-100 py-4 ' + (isCard ? 'bg-white b-rad-5 ' : '') + extraClass
        }
      >
        <div className="h5 fw-400 text-neutral-200 text-center mb-0">
          {isLoading ? (
            <>
              Please wait{' '}
              <div
                className="spinner-border spinner-border-sm ms-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            notAvailableTitle || 'Not Available'
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingNotAvailable;
