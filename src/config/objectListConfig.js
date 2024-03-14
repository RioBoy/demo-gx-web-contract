export const objectListDetail = (
  title,
  content,
  isLayoutContentDefault = true,
) => ({ title, content, isLayoutContentDefault });

export const objectListDetailCustom = (
  title = '',
  content = '',
  isLayoutContentDefault = false,
  required = false,
) => {
  return {
    ...objectListDetail(
      <>
        <div className="mobile-wp-fs-20 wp-fs-20 wp-fw-300 text-neutral-100 d-flex justify-content-between">
          <p className="lh-base mb-0">
            {title}
            {''}
            {required ? <span className="text-danger-200">*</span> : null}
          </p>
          <p className="lh-base mb-0">:</p>
        </div>
      </>,
      <>
        <div className="mobile-fs-20 fs-20 fw-600 text-neutral-100 text-break lh-base">
          {content}
        </div>
      </>,
      isLayoutContentDefault,
    ),
  };
};
