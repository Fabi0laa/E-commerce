import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import LoginArea from '@/components/login-register/login-area';
import NoAuthWrapper from '@/layout/no-auth-wrapper';

const LoginPage = () => {
  return (
    <NoAuthWrapper>
      <SEO pageTitle="Login" />
      <CommonBreadcrumb title="Login" subtitle="Login" center={true} />
      <LoginArea />
      <Footer primary_style={true} />
    </NoAuthWrapper>
  );
};

export default LoginPage;
