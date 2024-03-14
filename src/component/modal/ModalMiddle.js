import { useEffect, useState } from 'react';

const ModalMiddle = (props) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const _handleCheckMobile = () => {
      let windowMedia = null;
      if (typeof window !== 'undefined') {
        windowMedia = window.matchMedia('(max-width: 425px)').matches;
        setMobile(windowMedia);
      }
    };

    _handleCheckMobile();

    window.addEventListener('resize', _handleCheckMobile);

    return () => {
      window.removeEventListener('resize', _handleCheckMobile);
    };
  }, [mobile]);

  return (
    <div
      className={
        'modal fade px-0 ' +
        (props.extraClass || '') +
        (props.isSlideUp ? 'slide-up ' : '')
      }
      id={props.id}
      tabIndex="1"
      data-bs-keyboard={props.closeAnyWay ? 'true' : 'false'}
      data-bs-backdrop={props.closeAnyWay ? 'true' : 'static'}
      style={{ zIndex: props.zIndex || 1055 }}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className={
          `modal-dialog ${props.isRemoveConfirm ? 'px-3' : 'px-2'} px-md-0 ` +
          (props.isCentered ? 'modal-dialog-centered ' : '') +
          (props.isScrollable ? 'modal-dialog-scrollable ' : '') +
          (props.modalDialogClassName || '')
        }
        {...(props.styleDialog || '')}
        style={
          mobile
            ? { width: props.isRemoveConfirm ? '100%' : '' }
            : {
                width: props.width || 650,
                maxWidth: props.width || 650,
              }
        }
      >
        {props.isCentered ? (
          <div className={'modal-content ' + (props.extraClassContent || '')}>
            <div className="modal-header border-0 clearfix clearfix text-left">
              {props.title ? <h3 className="title">{props.title}</h3> : null}
              {props.titleSecond ? (
                <p className="mb-0 fs-14">{props.titleSecond}</p>
              ) : null}

              {!props.hideClose ? (
                typeof props.closeAction == 'function' ? (
                  <button
                    type="button"
                    className="btn-close z-index-1"
                    onClick={() =>
                      props.closeAction ? props.closeAction() : {}
                    }
                  ></button>
                ) : (
                  <button
                    type="button"
                    className="btn-close z-index-1"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                  ></button>
                )
              ) : null}
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        ) : (
          <div className="modal-content-wrapper">
            <div className={'modal-content ' + (props.extraClassContent || '')}>
              <div className="modal-header border-0 clearfix clearfix text-left">
                {props.title ? <h3 className="title">{props.title}</h3> : null}
                {props.titleSecond ? (
                  <p className="mb-0 fs-14">{props.titleSecond}</p>
                ) : null}

                {!props.hideClose ? (
                  typeof props.closeAction == 'function' ? (
                    <button
                      type="button"
                      className="btn-close z-index-1"
                      onClick={() =>
                        props.closeAction ? props.closeAction() : {}
                      }
                    ></button>
                  ) : (
                    <button
                      type="button"
                      className="btn-close z-index-1"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  )
                ) : null}
              </div>
              <div className="modal-body">{props.children}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMiddle;
