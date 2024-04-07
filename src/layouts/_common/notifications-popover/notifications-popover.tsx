'use client';

import { m } from 'framer-motion';
import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { _notifications } from 'src/_mock';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
//
import NotificationItem from './notification-item';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { t } = useLocales();

  const TABS = [
    {
      value: 'all',
      label: t('common.all'),
      count: 22,
    },
    {
      value: 'unread',
      label: t('common.unread'),
      count: 12,
    },
    {
      value: 'archived',
      label: t('common.archived'),
      count: 10,
    },
  ];

  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const [currentTab, setCurrentTab] = useState('all');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const [notifications, setNotifications] = useState(_notifications);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" textTransform="capitalize" sx={{ flexGrow: 1 }}>
        {t('common.notifications')}
      </Typography>

      {!!totalUnRead && (
        <Tooltip title={t('common.mark_all_as_read')}>
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="f7:bell-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
          sx={{
            textTransform: 'capitalize',
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <Tooltip title={t('common.notifications')}>
        <IconButton
          component={m.button}
          whileTap="tap"
          aria-label={t('common.notifications')}
          whileHover="hover"
          variants={varHover(1.05)}
          color={drawer.value ? 'primary' : 'default'}
          onClick={drawer.onTrue}
        >
          <Badge variant="dot" color="error">
            <Iconify icon="f7:bell-fill" sx={{ color: 'text.disabled' }} width={25} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
          <IconButton onClick={handleMarkAllAsRead}>
            <Iconify icon="solar:settings-bold-duotone" />
          </IconButton>
        </Stack>

        <Divider />

        {renderList}

        <Box sx={{ p: 1 }} textTransform="capitalize">
          <Button fullWidth size="large">
            {t('common.view_all')}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
