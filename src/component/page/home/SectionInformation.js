import * as _ from 'lodash';
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopDataLogic';
import { PageSubTitle, PageTitleMain } from '@/component/general/PageTitle';
import { objectListDetailCustom } from '@/config/objectListConfig';

const SectionInformation = ({ data = {} }) => {
  const {
    customer = {},
    company = {},
    serviceLocation = {},
    subscription = {},
    proformaInvoice = {},
  } = data;

  return (
    <section className="container">
      <PageTitleMain
        title="Prospect Contract"
        extraClass="text-center padding-title mb-0"
      />

      <div className="mb-4">
        <PageSubTitle
          title="Person in Charge"
          extraClass="mobile-fs-24 border-bottom border-neutral-400"
        />

        <HorizontalLoopDataLogic
          list={[
            objectListDetailCustom('Name', customer?.holderName || '-'),
            objectListDetailCustom('Address', customer?.address || '-'),
            objectListDetailCustom(
              'Phone Number',
              customer?.phoneNumber || '-',
            ),
            objectListDetailCustom('Email Address', customer?.email || '-'),
            objectListDetailCustom(
              'Identification Number',
              customer?.identificationNumber || '-',
            ),
          ]}
          config={{
            titleColumn: 'col-md-5 col-lg-4',
            contentColumn: 'col-md-7 col-lg-8',
          }}
        />
      </div>

      <div className="mb-4">
        <PageSubTitle
          title="Company Infomation"
          extraClass="mobile-fs-24 border-bottom border-neutral-400"
        />

        <HorizontalLoopDataLogic
          list={[
            objectListDetailCustom('Company Name', company?.companyName || '-'),
            objectListDetailCustom(
              'Company Address',
              company?.companyAddress || '-',
            ),
          ]}
          config={{
            titleColumn: 'col-md-5 col-lg-4',
            contentColumn: 'col-md-7 col-lg-8',
          }}
        />
      </div>

      <div className="mb-4">
        <PageSubTitle
          title="Service Location Information"
          extraClass="mobile-fs-24 border-bottom border-neutral-400"
        />

        <HorizontalLoopDataLogic
          list={[
            objectListDetailCustom(
              'Location Nickname',
              serviceLocation?.locationNickName || '-',
              false,
              true,
            ),
            objectListDetailCustom(
              'Service Location Address',
              serviceLocation?.address || '-',
              false,
              true,
            ),
            objectListDetailCustom(
              'Property Ownership',
              !_.isEmpty(serviceLocation?.propertyOwnership)
                ? serviceLocation?.propertyOwnership?.name || '-'
                : '-',
            ),
            objectListDetailCustom(
              'Building Type',
              !_.isEmpty(serviceLocation?.buildingType)
                ? serviceLocation?.buildingType?.name || '-'
                : '-',
            ),
          ]}
          config={{
            titleColumn: 'col-md-5 col-lg-4',
            contentColumn: 'col-md-7 col-lg-8',
          }}
        />
      </div>

      <div className="mb-4">
        <PageSubTitle
          title="Subscription Information"
          extraClass="mobile-fs-24 border-bottom border-neutral-400"
        />

        <HorizontalLoopDataLogic
          list={[
            objectListDetailCustom(
              'Package Name',
              subscription?.alias || '-',
              false,
              true,
            ),
            objectListDetailCustom(
              'Recurring Fee',
              subscription?.recurringFeeRp || '-',
            ),
            objectListDetailCustom(
              'Setup Fee',
              subscription?.setupFeeRp || '-',
            ),
            objectListDetailCustom(
              'Maintenance Fee',
              subscription?.maintenanceFeeRp || '-',
            ),
            objectListDetailCustom(
              'Proforma Invoice Number',
              proformaInvoice?.number || '-',
            ),
            objectListDetailCustom(
              'Ammount Due Before Activation',
              proformaInvoice?.amountRp || '-',
            ),
          ]}
          config={{
            titleColumn: 'col-md-5 col-lg-4',
            contentColumn: 'col-md-7 col-lg-8',
          }}
        />
      </div>

      <div className="mb-5">
        <PageSubTitle
          title="Statement"
          extraClass="mobile-fs-24 border-bottom border-neutral-400"
        />

        <p className="mobile-fs-20 fs-20 fw-500 mb-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </section>
  );
};

export default SectionInformation;
