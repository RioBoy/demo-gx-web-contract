import { memo } from 'react';

export const BtnPrimaryBrand = memo((props) => (
  <button
    className={
      'btn ' +
      (props.isOutline ? 'btn-outline-primary ' : 'btn-primary ') +
      (props.extraClass || '') +
      (props.hasIcon ? 'd-flex align-items-center' : '')
    }
    disabled={props.disabled}
    type={props.type || 'button'}
    onClick={props.handle}
    {...props.other}
  >
    {props.children}
    {props.hasIcon ? props.icon : null}
  </button>
));
