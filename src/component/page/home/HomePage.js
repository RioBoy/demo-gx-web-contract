'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import * as _ from 'lodash';
import * as crypto from 'crypto';
import Navbar from '@/component/layout/Navbar';
import SectionInformation from './SectionInformation';
const SectionSignature = dynamic(() => import('./SectionSignature'), {
  ssr: false,
});
import Footer from '@/component/layout/Footer';
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable';
import ModalMiddle from '@/component/modal/ModalMiddle';
import { MDSuccessApplySignature } from '@/config/modalConfig';
import actionModal from '@/helper/actionModalHelper';

const HomePage = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('k');

  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataContract, setDataContract] = useState({});

  const _handleSetData = (data = {}) => {
    if (!_.isEmpty(data)) {
      setDataContract(data);
    }
  };

  const _handleGetData = () => {
    try {
      if (!_.isEmpty(params)) {
        const decoded_url_encoded_data = decodeURIComponent(params);
        const decoded_encrypted_data = Buffer.from(
          decoded_url_encoded_data,
          'base64',
        );
        let key = 'MyGXtR3m34ppS3creTsT4G1nG';

        // Ensure key is of correct length
        if (key.length < 16) {
          key = key.padEnd(16, '\0'); // Pad with null bytes
        } else if (key.length > 16) {
          key = key.slice(0, 16); // Truncate to first 16 characters
        }

        const decipher = crypto.createDecipheriv(
          'aes-128-ecb',
          key,
          Buffer.alloc(0),
        ); // Empty IV

        let decrypted_data = decipher.update(
          decoded_encrypted_data,
          'binary',
          'utf8',
        );
        decrypted_data += decipher.final('utf8');

        const decrypted_data_array = decrypted_data.split(':');

        let jsonData = '';

        if (decrypted_data_array.length > 1) {
          const decoded_base64_encoded_json = Buffer.from(
            decrypted_data_array[1],
            'base64',
          ).toString('utf8');
          jsonData = JSON.parse(decoded_base64_encoded_json);
          if (jsonData.serviceLocation) {
            jsonData.serviceLocation.id = Buffer.from(
              jsonData.serviceLocation.uniqueId,
              'base64',
            ).toString('utf8');
          }
        }

        setContent(jsonData);
      } else {
        setContent({});
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataContract)) {
      setTimeout(() => {
        actionModal(MDSuccessApplySignature, true);
      }, 3000);
    }

    _handleGetData();
  }, [dataContract]);

  return (
    <>
      {isLoading ? (
        <LoadingNotAvailable
          isLoading={isLoading}
          config={{
            isCard: false,
            extraClass:
              'vh-100 d-flex align-items-center justify-content-center overflow-hidden',
          }}
        />
      ) : !_.isEmpty(content) ? (
        <>
          <Navbar />
          <main className="position-relative">
            <SectionInformation data={content} />
            <SectionSignature
              data={content}
              actions={{
                handleSetData: (passData) => _handleSetData(passData),
              }}
            />

            <img
              src="/images/logo/gx-logo-big.svg"
              alt="GlobalXtreme"
              className="logo-watermark"
            />
          </main>
          <Footer />
        </>
      ) : (
        <LoadingNotAvailable
          isLoading={false}
          notAvailableTitle="Page Not Available"
          config={{
            isCard: false,
            extraClass:
              'vh-100 d-flex align-items-center justify-content-center overflow-hidden',
          }}
        />
      )}

      {useMemo(
        () => (
          <ModalMiddle
            id={MDSuccessApplySignature}
            width={500}
            hideClose
            isSlideUp
            isRemoveConfirm
          >
            <div className="row">
              <div className="col-md-12">
                <div className="text-center w-100 mb-4">
                  <img
                    src="/images/icon/icon-success.svg"
                    alt="Success"
                    className="w-auto h-100 object-fit-cover"
                  />
                </div>

                <h5 className="fw-600 text-center py-2 mb-0">
                  Success Create Contract <br />
                </h5>
              </div>

              <div className="col-md-12 text-center mt-4">
                <Link
                  href="https://globalxtreme.net"
                  className="btn btn-outline-primary me-3"
                >
                  Finish
                </Link>

                <Link
                  href={!_.isEmpty(dataContract) ? dataContract.contract : '#'}
                  className="btn btn-primary me-3"
                >
                  Preview
                </Link>
              </div>
            </div>
          </ModalMiddle>
        ),
        [dataContract],
      )}
    </>
  );
};

export default HomePage;
