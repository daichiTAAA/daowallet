import dynamic from 'next/dynamic';
import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
