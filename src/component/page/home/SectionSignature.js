'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import * as Icon from 'iconsax-react';
import SignaturePad from 'signature_pad';
import { PageSubTitle } from '@/component/general/PageTitle';
import FormUploadFile from '@/component/form/FormUploadFile';
import Signature from './Signature';
import {
  homeCompanyParam,
  homeMainParam,
  homeProformaInvoiceParam,
  homeServiceLocParam,
  homeServiceLocCoordinatesParam,
  homeServiceLocPropertyOwnershipParam,
  homeServiceLocBuildingTypeParam,
  homeSubscriptionParam,
  homeSubscriptionBillingPeriodParam,
} from '@/service/param/homeParam';
import { objectToFormData } from '@/helper/convertFormDataHelper';
import { createProspectContract } from '@/service/sales/salesAPI';
import { isSuccess } from '@/helper/conditionHelper';
import actionModal from '@/helper/actionModalHelper';
import { MDSuccessApplySignature } from '@/config/modalConfig';

const SectionSignature = ({
  data = {},
  actions = { handleSetData: () => {} },
}) => {
  const signatureRef = useRef(null);
  let signaturePad = {};
  const [signatureCanvas, setSignatureCanvas] = useState({});

  const [formRequest, setFormRequest] = useState({
    customer: _.cloneDeep(homeMainParam),
    company: _.cloneDeep(homeCompanyParam),
    serviceLocation: _.cloneDeep({
      ...homeServiceLocParam,
      coordinates: {
        ...homeServiceLocCoordinatesParam,
      },
      propertyOwnership: {
        ...homeServiceLocPropertyOwnershipParam,
      },
      buildingType: {
        ...homeServiceLocBuildingTypeParam,
      },
    }),
    subscription: _.cloneDeep({
      ...homeSubscriptionParam,
      billingPeriod: {
        ...homeSubscriptionBillingPeriodParam,
      },
    }),
    proformaInvoice: _.cloneDeep(homeProformaInvoiceParam),
    signature: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyCanvas, setIsEmptyCanvas] = useState(true);

  const [previewFiles, setPreviewFiles] = useState([]);

  const _handleChange = (name, value) => {
    setFormRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const _handleRemove = (index = -1) => {
    const newPreviewFiles = [...previewFiles];

    if (index > -1) {
      newPreviewFiles.splice(index, 1);
      setPreviewFiles(newPreviewFiles);

      _handleChange('signature', '');
    }
  };

  const _handleSetPreviewFile = (data = []) => setPreviewFiles(data);

  const resizeCanvas = () => {
    const canvas = signatureRef.current;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
  };

  const _handleClear = () => {
    signatureCanvas.clear();
    setIsEmptyCanvas(true);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataURLToBlob = async (dataURL) => {
      return fetch(dataURL)
        .then((res) => res.blob())
        .then((blob) => {
          return blob;
        })
        .catch((error) => {
          console.error('error blob:', error);
        });
    };

    const signaturePadBuffer = await dataURLToBlob(
      signatureCanvas.toDataURL('image/png'),
    );

    const fileName = 'signature.png';
    const fileFromBuffer = new File([signaturePadBuffer], fileName, {
      type: signaturePadBuffer.type,
    });

    const dataFormRequest = {
      ...formRequest,
      signature: _.isEmpty(formRequest.signature)
        ? fileFromBuffer
        : formRequest.signature,
    };

    const convertToFormData = new Promise((resolve, reject) => {
      try {
        let formData = objectToFormData(_.cloneDeep(dataFormRequest));
        resolve(formData);
      } catch (error) {
        setIsLoading(false);
      }
    });

    convertToFormData.then((formData) => {
      createProspectContract(formData)
        .then((resData) => {
          setIsLoading(false);

          if (isSuccess(resData)) {
            actionModal(MDSuccessApplySignature);
            actions.handleSetData(resData.result);
            _handleClear();
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      const {
        customer = {},
        company = {},
        serviceLocation = {},
        subscription = {},
        proformaInvoice = {},
      } = data;

      const newFormRequest = {};

      // customer
      if (!_.isEmpty(customer)) {
        newFormRequest['customer'] = {
          holderName: customer?.holderName || '',
          companyName: customer?.companyName || '',
          address: customer?.address || '',
          email: customer?.email || '',
          identificationNumber: customer?.identificationNumber || '',
          phoneNumber: customer?.phoneNumber || '',
        };
      }

      // company
      if (!_.isEmpty(company)) {
        newFormRequest['company'] = {
          companyName: '',
          companyAddress: '',
          companyEmail: '',
        };
      }

      // service location
      if (!_.isEmpty(serviceLocation)) {
        const {
          coordinates = {},
          propertyOwnership = {},
          buildingType = {},
        } = serviceLocation;

        newFormRequest['serviceLocation'] = {
          uniqueId: serviceLocation?.uniqueId || '',
          address: serviceLocation?.address || '',
          id: serviceLocation?.id || '',
        };

        if (!_.isEmpty(coordinates)) {
          newFormRequest.serviceLocation['coordinates'] = {
            latitude: coordinates?.latitude || '',
            longitude: coordinates?.longitude || '',
          };
        }

        if (!_.isEmpty(propertyOwnership)) {
          newFormRequest.serviceLocation['propertyOwnership'] = {
            id: propertyOwnership?.id || '',
            name: propertyOwnership?.name || '',
          };
        }

        if (!_.isEmpty(buildingType)) {
          newFormRequest.serviceLocation['buildingType'] = {
            name: buildingType?.name || '',
          };
        }
      }

      // subscription
      if (!_.isEmpty(subscription)) {
        const { billingPeriod } = subscription;

        newFormRequest['subscription'] = {
          name: subscription?.name || '',
          alias: subscription?.alias || '',
          recurringFee: subscription?.recurringFee || '',
          recurringFeeRp: subscription?.recurringFeeRp || '',
          setupFee: subscription?.setupFee || '',
          setupFeeRp: subscription?.setupFeeRp || '',
          maintenanceFee: subscription?.maintenanceFee || '',
          maintenanceFeeRp: subscription?.maintenanceFeeRp || '',
        };

        if (!_.isEmpty(billingPeriod)) {
          newFormRequest.subscription['billingPeriod'] = {
            id: billingPeriod?.id || '',
            name: billingPeriod?.name || '',
          };
        }
      }

      // proforma invoice
      if (!_.isEmpty(proformaInvoice)) {
        newFormRequest['proformaInvoice'] = {
          number: proformaInvoice?.number || '',
          amount: proformaInvoice?.amount || '',
          amountRp: proformaInvoice?.amountRp || '',
        };
      }

      setFormRequest((prev) => ({
        ...prev,
        ...newFormRequest,
      }));
    } else {
      setFormRequest((prev) => ({
        ...prev,
      }));
    }
  }, []);

  useEffect(() => {
    signaturePad = new SignaturePad(signatureRef.current);

    signaturePad.addEventListener('beginStroke', () => {
      setIsEmptyCanvas(false);
    });

    setSignatureCanvas(signaturePad);
    resizeCanvas();
  }, []);

  useEffect(() => {
    if (formRequest.signature !== '') {
      signatureCanvas?.clear();
      setIsEmptyCanvas(true);
    }
  }, [formRequest.signature, signatureCanvas]);

  const UISignature = () =>
    useMemo(
      () => (
        <Signature
          signatureRef={signatureRef}
          isEmptyCanvas={isEmptyCanvas}
          isLoading={isLoading}
          actions={{
            clear: _handleClear,
          }}
          extraClass={!_.isEmpty(previewFiles) ? 'd-none' : 'd-block'}
        />
      ),
      [previewFiles],
    );

  return (
    <section className="container pt-1">
      <form onSubmit={_handleSubmit}>
        <div className="row align-items-center">
          <div className="col">
            <PageSubTitle title="Signature" extraClass="mobile-fs-24" />
          </div>

          <div className="col-auto d-flex justify-content-end mb-4 mb-md-0">
            <FormUploadFile
              title="Upload Signature"
              name="signature"
              value={formRequest.signature}
              actions={{
                onChange: (name, value) => _handleChange(name, value),
                handleSetDataPreview: (data) => _handleSetPreviewFile(data),
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-4">
            {!_.isEmpty(previewFiles) ? (
              <div className="wp-signature-upload">
                {previewFiles.map((vm, idx) => (
                  <div key={idx}>
                    <img src={vm.url} alt={vm.name} />

                    <button
                      type="button"
                      className="btn-circle-icon btn btn-danger-300 text-danger-100 position-absolute top-3 end-3"
                      onClick={() => _handleRemove(idx)}
                      disabled={isLoading}
                    >
                      <Icon.Trash variant="Bold" size="16" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            {UISignature()}
          </div>

          <div className="col-md-12 pt-1 mb-5">
            <PageSubTitle
              title={data?.customer?.holderName || '-'}
              extraClass="mobile-fs-24"
            />

            <p className="fs-16 fw-400 mb-0">
              Prepared By. <span className="fw-600">Arbi Mauday</span>, On{' '}
              {moment().format('DD MMMM YYYY')}
            </p>
          </div>

          <div className="col-12 col-md-4 offset-md-4 d-grid mt-3">
            <button
              type="submit"
              className="btn btn-primary fs-16 fw-500 py-3"
              disabled={
                isLoading || (isEmptyCanvas && formRequest.signature === '')
              }
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SectionSignature;
