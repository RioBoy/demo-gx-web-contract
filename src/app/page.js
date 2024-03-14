import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const HomePage = dynamic(() => import('@/component/page/home/HomePage'), {
  ssr: false,
});

const Home = () => {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
};

export default Home;
