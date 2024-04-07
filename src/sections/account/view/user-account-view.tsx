'use client';

import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import AccountGeneral from '../account-general';
import AccountBilling from '../account-billing';
import AccountSocialLinks from '../account-social-links';
import AccountNotifications from '../account-notifications';
import AccountChangePassword from '../account-change-password';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const TABS = [
    {
      value: 'general',
      label: t('userAccount.general'),
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    // {
    //   value: 'billing',
    //   label: t('userAccount.billing'),
    //   icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    // },
    // {
    //   value: 'notifications',
    //   label: t('userAccount.notifications'),
    //   icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    // },
    // {
    //   value: 'social',
    //   label: t('userAccount.social_links'),
    //   icon: <Iconify icon="solar:share-bold" width={24} />,
    // },
    {
      value: 'security',
      label: t('userAccount.security'),
      icon: <Iconify icon="ic:round-vpn-key" width={24} />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading={t('userAccount.account')}
        links={[
          { name: t('userAccount.dashboard'), href: paths.dashboard.root },
          { name: t('userAccount.user'), href: paths.dashboard.user.root },
          { name: t('userAccount.account') },
        ]}
        sx={{
          textTransform: 'capitalize',
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            sx={{ textTransform: 'capitalize' }}
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'billing' && (
        <AccountBilling
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )}

      {currentTab === 'notifications' && <AccountNotifications />}

      {currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />}

      {currentTab === 'security' && <AccountChangePassword />}
    </Container>
  );
}