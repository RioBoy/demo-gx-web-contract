import { Suspense } from 'react';
import HomePage from '@/component/page/home/HomePage';

const Home = () => {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
};

export default Home;
