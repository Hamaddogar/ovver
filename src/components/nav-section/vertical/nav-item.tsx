// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
// routes
import { RouterLink } from 'src/routes/components';
//
import Iconify from '../../iconify';
//
import { NavItemProps, NavConfigProps, CustomNavItemProps } from '../types';
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';
import { usePathname } from 'next/navigation';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = CustomNavItemProps & {
  config: NavConfigProps;
};

export default function NavItem({
  item,
  open,
  depth,
  active,
  config,
  externalLink,
  ...other
}: Props) {
  const { title, path, icon, info, children, disabled, caption, roles, permissions } = item;
  const pathname = usePathname();
  const { t, currentLang } = useLocales();
  const isActive = path === pathname;

  const [hasCommonRole, setHasCommonRole] = useState<any>(null);
  const [hasCommonPermission, setHasCommonPermission] = useState<any>(null);

  useEffect(() => {
    const userRoles = config.currentRoles || [];
    const userPermissions = config.currentPermissions || [];

    const hasCommonRoleV = userRoles.some((role: string) => roles && roles.includes(role)) || false;
    const hasCommonPermissionV =
      (permissions &&
        permissions.some(
          (permission: string) =>
            userPermissions && userPermissions?.permissions?.includes(permission)
        )) ||
      false;

    setHasCommonRole(hasCommonRoleV);
    setHasCommonPermission(hasCommonPermissionV);
  }, [config, permissions, roles]);

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      disableGutters
      disabled={disabled}
      active={isActive}
      depth={depth}
      config={config}
      {...other}
    >
      <>
        {/* {icon && <StyledIcon active={active} size={config.iconSize} {...other}>{icon}</StyledIcon>} */}
        {icon && (
          <Iconify
            icon={`${icon}`}
            sx={{ marginInlineEnd: 1.5, color: isActive ? 'primary.main' : 'text.secondary' }}
          />
        )}

        {subItem && (
          <StyledIcon size={config.iconSize}>
            <StyledDotIcon active={isActive} />
          </StyledIcon>
        )}
      </>

      {!(config.hiddenLabel && !subItem) && (
        <Link href={path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText
            primary={t(`common.nav.${title}`)}
            secondary={
              caption ? (
                <Tooltip title={caption} placement="top-start">
                  <span>{caption}</span>
                </Tooltip>
              ) : null
            }
            primaryTypographyProps={{
              noWrap: true,
              typography: 'body2',
              textTransform: 'capitalize',
              fontWeight: isActive ? 'fontWeightBold' : 'fontWeightSemiBold',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Link>
      )}

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{
            ml: 1,
            flexShrink: 0,
            transform: currentLang.value === 'ar' && !open ? 'scale(-1)' : '',
          }}
        />
      )}
    </StyledItem>
  );

  // Hidden item by role
  if ((roles && !hasCommonRole) || (permissions && !hasCommonPermission)) {
    return null;
  }

  // if (roles && !roles.includes(`${config.currentRole}`)) {
  //   return null;
  // }

  // External link
  if (externalLink)
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        color="inherit"
        sx={{
          ...(disabled && {
            color: 'red',
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      color="inherit"
      sx={{
        ...(disabled && {
          cursor: 'default',
        }),
      }}
    >
      {renderContent}
    </Link>
  );
}
