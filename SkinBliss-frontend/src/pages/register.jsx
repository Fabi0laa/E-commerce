import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import RegisterArea from '@/components/login-register/register-area';
import NoAuthWrapper from '@/layout/no-auth-wrapper';

const RegisterPage = () => {
  return (
    <NoAuthWrapper>
      <SEO pageTitle="Login" />
      <CommonBreadcrumb title="Register" subtitle="Register" center={true} />
      <RegisterArea />
      <Footer primary_style={true} />
    </NoAuthWrapper>
  );
};

export default RegisterPage;
