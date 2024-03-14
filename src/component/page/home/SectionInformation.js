import * as _ from 'lodash';
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopDataLogic';
import { PageSubTitle, PageTitleMain } from '@/component/general/PageTitle';
import { objectListDetailCustom } from '@/config/objectListConfig';

const dataStatement = [
  {
    id: 1,
    text: 'I hereby declare that the above information are correct and the facts set forth in this contract and any accompanying technical data are true and correct.',
  },
  {
    id: 2,
    text: 'By signing this Internet Subscription Contract, I state that I have received and approved the contract with PT Internet Madju Abad Milenindo, and have read, understood and agreed to all terms and conditions of subscription. All rights and obligations will take effect from the date of signing of this contract',
  },
  {
    id: 3,
    text: 'I understand that all payment made to PT Internet Madju Abad Milenindo is non-refundable, except in the event of certain conditions previously approved by PT Internet Madju Abad Milenindo.',
  },
  {
    id: 4,
    text: 'By signing this contract I acknowledge the receipt copy of this  contract and I agree that I have been given sufficient time to review this contract, its terms and conditions, disclaimer, and its rights and responsibilities of customers and written.',
  },
];

const ListStatement = ({ children, extraClass = '' }) => (
  <li className="mb-3">
    {
      <p
        className={
          'mobile-fs-20 fs-20 fw-600 text-neutral-100 lh-base mb-0 ' +
          extraClass
        }
      >
        {children}
      </p>
    }
  </li>
);

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

      {!_.isEmpty(company) ? (
        <div className="mb-4">
          <PageSubTitle
            title="Company Infomation"
            extraClass="mobile-fs-24 border-bottom border-neutral-400"
          />

          <HorizontalLoopDataLogic
            list={[
              objectListDetailCustom(
                'Company Name',
                company?.companyName || '-',
              ),
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
      ) : null}

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

        <div className="wp-statement">
          <ol>
            {dataStatement.map((vm) => (
              <ListStatement key={vm.id}>{vm.text}</ListStatement>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default SectionInformation;
